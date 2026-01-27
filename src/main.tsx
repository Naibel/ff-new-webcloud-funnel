import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import des styles ODS selon la documentation
// Import du normalize CSS et des styles globaux du Design System OVHcloud
import '@ovhcloud/ods-react/styles/normalize.css'
import '@ovhcloud/ods-react/styles/index.scss'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
