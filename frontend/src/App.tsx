import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Pricing from "./Pages/Pricing/Pricing";
import Registration from "./Pages/RegisterLogin/Registration";
import Home from "./Pages/Learning/Home";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "../components/routes/PrivateRoute";
import ThemeSettings from "./Pages/Settings/ThemeSettings";
import PublicProfile from "./Pages/Settings/PublicProfile";
import { ThemeProvider } from "./components/ui/theme-provider";

// interface PrivateRouteProps {
//   component: React.ComponentType;
// }

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <AuthProvider>
          <div className="container px-6 mx-auto font-sans">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          </div>
          <div className="dark:bg-gray-800 dark:text-white">
            <Routes>
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/theme" element={<ThemeSettings />} />
              <Route path="/profile" element={<PublicProfile />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
