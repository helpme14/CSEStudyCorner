import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Pricing from "./Pages/Pricing/Pricing";
import Registration from "./Pages/RegisterLogin/Registration";
import Home from "./Pages/Learning/Home";
import "./index.css";
import "./App.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import ThemeSettings from "./Pages/Settings/ThemeSettings";
import PublicProfile from "./Pages/Settings/PublicProfile";
import AccountSettings from "./Pages/Settings/AccountSettings";
import CloseAccount from "./Pages/Settings/CloseAccount";
import ForgotPassword from "./Pages/RegisterLogin/ForgotPassword";
import EmailTemplate from "./Pages/RegisterLogin/EmailTemplate";
import ProfilePicture from "./Pages/Settings/ProfilePicture";
import NotFound from "./Pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "../components/routes/PrivateRoute";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Toaster />
      <Router>
        <AuthProvider>
          <div className="mx-auto font-sans dark:bg-gray-900 dark:text-white">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/registration" element={<Registration />} />

              {/* Private Routes */}
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/home/profile"
                element={
                  <PrivateRoute>
                    <PublicProfile />
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
                path="/home/theme"
                element={
                  <PrivateRoute>
                    <ThemeSettings />
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

              <Route
                path="/home/profile-picture"
                element={
                  <PrivateRoute>
                    <ProfilePicture />
                  </PrivateRoute>
                }
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/email-template" element={<EmailTemplate />} />

              {/* Catch-all Route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
