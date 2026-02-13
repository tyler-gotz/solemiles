import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { Provider } from './components/ui/provider.tsx'
import { Toaster } from './components/ui/toaster.tsx'

import './assets/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider forcedTheme='light'>
      <App />
      <Toaster />
    </Provider>
  </StrictMode>,
)
