import { InteractionType, PublicClientApplication } from "@azure/msal-browser";

const tenantId = import.meta.env.VITE_OUTLOOK_TENANT_ID; // Read from environment variable
const clientId = import.meta.env.VITE_OUTLOOK_CLIENT_ID; // Read from environment variable
const redirectUri = import.meta.env.VITE_OUTLOOK_REDIRECT_URI; // Read from environment variable
const postLogoutRedirectUri = import.meta.env
  .VITE_OUTLOOK_POST_LOGOUT_REDIRECT_URI; // Read from environment variable

const msalConfig = {
  auth: {
    clientId: clientId, // Application ID from Azure
    authority: `https://login.microsoftonline.com/${tenantId}`, // Tenant-specific authority
    redirectUri: redirectUri, // Redirect URI
    postLogoutRedirectUri: postLogoutRedirectUri, // Post-logout redirect URI
  },
  cache: {
    cacheLocation: "sessionStorage", // or "localStorage"
    storeAuthStateInCookie: false, // Set to true for IE 11
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ["Calendars.ReadWrite", "Calendars.Read"], // Request the necessary scopes
  interactionType: InteractionType.Popup, // Or InteractionType.Redirect
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me", // Basic Graph API endpoint
  graphCalendarEventsEndpoint: "https://graph.microsoft.com/v1.0/me/events", // Events endpoint
};
