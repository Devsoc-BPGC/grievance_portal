const express = require("express");
const router = express.Router();

const authorizeCSA = (req, res, next) => {
    if (req.user && req.user.type === "CSA") {
      
      next();
    } else {
      res.status(403).send("Unauthorized Access");
    }
  };

  router.put("/", authorizeCSA, async (req, res) => {
    
    const newReply = {
      replyContent: req.body.content, 
      replyTime: new Date(),
    };
  
    if (!newReply.replyContent) {
      return res.status(400).json({ msg: `Please send proper reply` });
    } else {
      try {
        const addedReply = await movies.addCSAReply(newReply, req.body._id);
        res.json(addedReply);
      } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
      }
    }
  });


  module.exports = router;