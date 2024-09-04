import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Pricing from "./Pages/Pricing/Pricing";
import Registration from "./Pages/RegisterLogin/Registration";
import Home from "./Pages/Learning/Home";
import "./index.css";


function App() {
  return (
    <Router>
        <div className="container px-6 mx-auto font-sans">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </div>
        <Routes>
        <Route
              path="/home"
              element={
                  <Home />
              }
            />
        </Routes>
    </Router>
  );
}

export default App;