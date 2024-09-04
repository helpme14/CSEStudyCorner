import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Pricing from "./Pages/Pricing/Pricing";
import Registration from "./Pages/RegisterLogin/Registration";
import Home from "./Pages/Learning/Home";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider";
import Settings from "./Pages/Settings/Settings";



function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
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
                path="/settings"
                element={
                    <Settings />
                }
              />
          </Routes>
          </div>
      </Router>
     </ThemeProvider>
  );
}

export default App;
