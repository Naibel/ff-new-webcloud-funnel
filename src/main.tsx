import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import des styles ODS selon la documentation officielle
import '@ovhcloud/ods-react/styles/normalize.css'
import '@ovhcloud/ods-react/styles/index.scss'
// Import des utilitaires ODS personnalisés
import './ods-utilities.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
