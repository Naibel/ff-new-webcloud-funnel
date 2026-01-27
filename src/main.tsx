import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import des styles ODS
// Note: Les composants ODS chargent leurs styles CSS automatiquement via leurs imports
// Les styles globaux (normalize, variables) sont optionnels
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
