import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Questionnaire from './pages/Questionnaire';
import DomainSelection from './pages/DomainSelection';
import HostingSelection from './pages/HostingSelection';
import Summary from './pages/Summary';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/domain" element={<DomainSelection />} />
        <Route path="/hosting" element={<HostingSelection />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
