import { BrowserRouter as Router, Routes, Route ,Navigate } from "react-router-dom";
import Landing from "./Pages/Landing";
import Pricing from "./Pages/Pricing/Pricing";
import Registration from "./Pages/RegisterLogin/Registration";
import Home from "./Pages/Learning/Home";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "../components/routes/PrivateRoute";
import ThemeSettings from "./Pages/Settings/ThemeSettings";
import PublicProfile from "./Pages/Settings/PublicProfile";
import AccountSettings from "./Pages/Settings/AccountSettings";
import { Toaster } from 'react-hot-toast';
import CloseAccount from "./Pages/Settings/CloseAccount";
import { ThemeProvider } from "./components/ui/theme-provider";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
       <Toaster />
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
              {/* Public route for /home */}
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home /> {/* Home page content */}
                  </PrivateRoute>
                }
              />
              {/* Nested routes under /home */}
              <Route
                path="/home/theme"
                element={
                  <PrivateRoute>
                    <ThemeSettings /> {/* Theme settings page */}
                  </PrivateRoute>
                }
              />
              <Route
                path="/home/profile"
                element={
                  <PrivateRoute>
                    <PublicProfile /> {/* Profile page */}
                  </PrivateRoute>
                }
              />
                <Route
                path="/home/account-settings"
                element={
                  <PrivateRoute>
                    <AccountSettings />
                    </PrivateRoute>
                }
              />
               <Route
                path="/home/close-account"
                element={
                  <PrivateRoute>
                    <CloseAccount />
                    </PrivateRoute>
                }
              />
              
          </Routes>
          </div>
          
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}


export default App;
