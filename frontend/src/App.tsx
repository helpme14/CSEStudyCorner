import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import Pricing from './Pages/Pricing/Pricing';
Tabs

import './index.css';
import { Tabs } from '../@/components/ui/tabs';

function App() {
  return (
    <Router>
      <div className='container mx-auto px-6'>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
