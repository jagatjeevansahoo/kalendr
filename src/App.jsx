import { useGoogleLogin } from "@react-oauth/google";

import "./App.css";
import { useState } from "react";
import GoogleCalendarView from "./components/GoogleCalendarView";
import OutlookCalendarView from "./components/OutlookCalendarView";

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
      <h1>Calendar App</h1>
      <OutlookCalendarView />
      {!accessToken ? (
        <>
          <button onClick={() => googleLogin()}>Google calendar</button>
        </>
      ) : (
        <GoogleCalendarView accessToken={accessToken} />
      )}
    </div>
  );
}

export default App;
