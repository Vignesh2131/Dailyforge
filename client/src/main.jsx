import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RecoilRoot } from 'recoil'
import { CookiesProvider } from 'react-cookie'
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </CookiesProvider>
  </StrictMode>
);
