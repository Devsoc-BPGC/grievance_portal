import React from "react";
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
import useAuth from "./useAuth";
import ComplaintStatus from "./pages/ComplaintStatus";
import MessageStatus from "./pages/MessageStatus";
import PrezHourMessages from "./pages/PrezHourMessages";
import SelectiveCSA from "./pages/SelectiveCSA";

function App() {
  const { user } = useAuth();
  const complainRoutes = formFields.map((item, i) => (
    <Route
      key={i}
      path={`/complain/${item.category}`}
      element={<Complain category={`${item.category}`} user={user} />}
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
    <header className="justify-center text-center align-center pt-6"
      style={{ color: 'white', fontSize: '1rem', backgroundColor: 'black' }}
    >
      Made with ❤️ by{' '}
      <a href='https://devsoc.club' style={{ color: '#ADD8E6' }}>
        DevSoc
      </a>
    </header>
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
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
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
              speed: 3,
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
              value: 0.4,
            },
            shape: {
              type: "circle",
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
          <Route path="/" element={<Dashboard user={user} />} />
          <Route
            path="/presidents-hour"
            element={<PresidentsHour user={user} />}
          />
          <Route path="/campus-heroes" element={<CampusHeroes />} />
          <Route path="/complain" element={<ComplaintDashboard />} />
          <Route
            path="/complaint-status"
            element={<ComplaintStatus user={user} />}
          />
          <Route
            path="/message-status"
            element={<MessageStatus user={user} />}
          />
          {complainRoutes}
        </Route>
        <Route
          path="/prezhour-prez"
          element={<PrezHourMessages user={user} />}
        />
        <Route path="/selective-csa" element={<SelectiveCSA user={user} />} />
        <Route path="/login" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
