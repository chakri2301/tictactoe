import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AiApp from './AiApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AiApp />
  </StrictMode>,
)
