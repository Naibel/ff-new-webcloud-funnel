import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import des styles ODS
import '@ovhcloud/ods-react/normalize-css'
import '@ovhcloud/ods-react/style'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
