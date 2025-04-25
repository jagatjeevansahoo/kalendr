import { useGoogleLogin } from "@react-oauth/google";

import "./App.css";
import { useState } from "react";
import GoogleCalendarView from "./components/GoogleCalendarView";

function App() {
  const [accessToken, setAccessToken] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      setAccessToken(tokenResponse.access_token);
    },
    onError: (error) => console.log("Login Failed:", error),
    scope: "https://www.googleapis.com/auth/calendar.events", // Request read/write scope
  });

  return (
    <div>
      {!accessToken ? (
        <button onClick={() => googleLogin()}>
          Sign in & Authorize Calendar
        </button>
      ) : (
        <GoogleCalendarView accessToken={accessToken} />
      )}
    </div>
  );
}

export default App;
