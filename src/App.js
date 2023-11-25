import Dashboard from "./pages/Dashboard";
import Complain from "./pages/Complain";
import {Routes, Route} from "react-router-dom"
import formFields from "./formFields";

function App() {
  const complainRoutes=formFields.map((item, i)=>
    <Route path={`/complain/${item.category}`} element={<Complain category={`${item.category}`}/>} />
  )
  return (
    <>
    <Routes>
        <Route path="/" element={<Dashboard />} />
        {/*<Route path="/complain/acads-research-placement" element={<Complain category="acads-research-placement"/>} />
        <Route path="/complain/mess-hostel-amenities" element={<Complain category="mess-hostel-amenities"/>} />
        <Route path="/complain/security-initiatives-infrastructure" element={<Complain category="security-initiatives-infrastructure"/>} />
        <Route path="/fitness-health-sports" element={<Complain category="fitness-health-sports"/>} />
        <Route path="/complain/clubs-societies-departments" element={<Complain category="clubs-societies-departments"/>} />
  <Route path="/complain/administrative-general" element={<Complain category="administrative-general"/>} />*/}
        {complainRoutes}
      </Routes>
    </>
  );
}

export default App;
