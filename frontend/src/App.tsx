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
import { Toaster } from 'react-hot-toast';
import CloseAccount from "./Pages/Settings/CloseAccount";
import ForgotPassword from "./Pages/RegisterLogin/ForgotPassword";
import EmailTempalte from "./Pages/RegisterLogin/EmailTemplate";
import ProfilePicture from "./Pages/Settings/ProfilePicture";
import CourseDetails from "./Pages/Learning/CourseDetails";
import ForgotPasswordEmail from "./Pages/RegisterLogin/ForgotPasswordEmail";





function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme" >
       <Toaster />
      <Router >
          <div className="px-6 mx-auto font-sans dark:bg-gray-800 ">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          </div>
          <div className="dark:bg-gray-900 dark:text-white">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/theme" element={<ThemeSettings />} />
            <Route path="/profile" element={<PublicProfile />} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/close-account" element={<CloseAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-password-email" element={<ForgotPasswordEmail />} />
            <Route path="/email-template" element={<EmailTempalte />} />
            <Route path="/profile-picture" element={<ProfilePicture />} />
            <Route path="/course-details" element={<CourseDetails />} />
          </Routes>
          </div>
      </Router>
     </ThemeProvider>
  );
}

export default App;