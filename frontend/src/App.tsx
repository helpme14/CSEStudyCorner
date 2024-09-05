import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Pricing from "./Pages/Pricing/Pricing";
import Registration from "./Pages/RegisterLogin/Registration";
import Home from "./Pages/Learning/Home";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import ThemeSettings from "./Pages/Settings/ThemeSettings";
import PublicProfile from "./Pages/Settings/PublicProfile";
import AccountSettings from "./Pages/Settings/AccountSettings";
import { Toaster } from 'react-hot-toast';
import CloseAccount from "./Pages/Settings/CloseAccount";





function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
       <Toaster />
      <Router>
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
                path="/theme"
                element={
                    <ThemeSettings />
                }
              />
               <Route
                path="/profile"
                element={
                    <PublicProfile />
                }
              />
               <Route
                path="/account-settings"
                element={
                    <AccountSettings />
                }
              />
               <Route
                path="/close-account"
                element={
                    <CloseAccount />
                }
              />
          </Routes>
          </div>
      </Router>
     </ThemeProvider>
  );
}

export default App;
