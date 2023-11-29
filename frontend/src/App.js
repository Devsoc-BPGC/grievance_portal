import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Complain from "./pages/Complain";
import { Routes, Route } from "react-router-dom";
import formFields from "./formFields";
import PresidentsHour from "./pages/PresidentsHour";
import CampusHeroes from "./pages/CampusHeroes";
import ComplaintDashboard from "./pages/ComplaintDashboard";
import Signin from "./pages/Signin";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import RequireAuth from "./RequireAuth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const complainRoutes = formFields.map((item, i) => (
    <Route
      key={i}
      path={`/complain/${item.category}`}
      element={<Complain category={`${item.category}`} />}
    />
  ));
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    return;
  }, []);
  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "none",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#FFFF00",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: false,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 100,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "triangle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/presidents-hour" element={<PresidentsHour />} />
          <Route path="/campus-heroes" element={<CampusHeroes />} />
          <Route path="/complain" element={<ComplaintDashboard />} />
          {complainRoutes}
        </Route>
        <Route path="/login" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
