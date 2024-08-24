import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import Pricing from './Pages/Pricing/Pricing';
import Registration from './Pages/RegisterLogin/Registration';
import './index.css';

function App() {
  return (
    <Router>
      <div className='container mx-auto px-6'>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
