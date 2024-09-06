import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Pricing from "./Pages/Pricing/Pricing";
import Registration from "./Pages/RegisterLogin/Registration";
import Home from "./Pages/Learning/Home";
import ThemeSettings from "./Pages/Settings/ThemeSettings";
import PublicProfile from "./Pages/Settings/PublicProfile";
import AccountSettings from "./Pages/Settings/AccountSettings";
import CloseAccount from "./Pages/Settings/CloseAccount";
import NotFound from "./Pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "../components/routes/PrivateRoute";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Toaster />
      <Router>
        <AuthProvider>
          <div className=" dark:bg-gray-800 dark:text-white">
            <div className="mx-auto font-sans ">
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
                
                {/* Catch-all Route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
