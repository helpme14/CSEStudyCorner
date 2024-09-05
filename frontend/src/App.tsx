
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Pricing from "./Pages/Pricing/Pricing";
import Registration from "./Pages/RegisterLogin/Registration";
import Home from "./Pages/Learning/Home";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "../components/routes/PrivateRoute";
import Settings from "./Pages/Settings/Settings";
interface PrivateRouteProps {
  component: React.ComponentType;
}

function App() {
  return (
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
                    <Home />
                }
              />
               <Route
                path="/settings"
                element={
                    <Settings />
                }
              />
          </Routes>
          </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
