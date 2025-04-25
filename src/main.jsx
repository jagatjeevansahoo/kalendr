import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CLIENT_ID } from "./configs/gsecrets.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { msalInstance } from "./configs/outlook.jsx";
import { MsalProvider } from "@azure/msal-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
