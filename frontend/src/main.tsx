import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { VideoProvider } from "./context/videoContext/videoContext.tsx";
import { UserProvider } from "./context/userContext/userContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <VideoProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </VideoProvider>
  </React.StrictMode>
);
