import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import Questionnaire from './pages/Questionnaire';
import DomainSelection from './pages/DomainSelection';
import HostingSelection from './pages/HostingSelection';
import Summary from './pages/Summary';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/funnel" element={<LandingPage />} />
        <Route path="/funnel/questionnaire" element={<Questionnaire />} />
        <Route path="/funnel/domain" element={<DomainSelection />} />
        <Route path="/funnel/hosting" element={<HostingSelection />} />
        <Route path="/funnel/summary" element={<Summary />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
