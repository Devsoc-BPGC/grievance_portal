import Dashboard from "./pages/Dashboard";
import Complain from "./pages/Complain";
import {Routes, Route} from "react-router-dom"
import formFields from "./formFields";
import PresidentsHour from "./pages/PresidentsHour";
import CampusHeroes from "./pages/CampusHeroes";
import ComplaintDashboard from "./pages/ComplaintDashboard";

function App() {
  const complainRoutes=formFields.map((item, i)=>
    <Route path={`/complain/${item.category}`} element={<Complain category={`${item.category}`}/>} />
  )
  return (
    <>
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/presidents-hour" element={<PresidentsHour />} />
        <Route path="/campus-heroes" element={<CampusHeroes />} />
        <Route path="/complain" element={<ComplaintDashboard />} />
        {complainRoutes}
      </Routes>
    </>
  );
}

export default App;
