import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Import des styles ODS
import '@ovhcloud/ods-react/styles/normalize.css'
import '@ovhcloud/ods-react/styles/index.scss'
// Import des styles Tailwind et personnalisés
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
