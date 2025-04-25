import { PublicClientApplication } from "@azure/msal-browser";

const tenantId = "487c7b14-59a9-4603-86ef-e9981b30a943"; // Replace with your Tenant ID

const msalConfig = {
  auth: {
    clientId: "9e8c335e-9dd1-40b1-b5b4-3bc3d1973843", // Replace with your Application ID from Azure
    authority: `https://login.microsoftonline.com/${tenantId}`, // Replace with your Tenant ID or "common" for multi-tenant
    redirectUri: "http://localhost:5173", // Your redirect URI
  },
  cache: {
    cacheLocation: "sessionStorage", // or "localStorage"
    storeAuthStateInCookie: false, // Set to true for IE 11
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ["Calendars.ReadWrite"], // Request the necessary scopes
  // interactionType: InteractionType.Redirect, // Or InteractionType.Popup,
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me", // Basic Graph API endpoint
  graphCalendarEventsEndpoint: "https://graph.microsoft.com/v1.0/me/events", // Events endpoint
};
