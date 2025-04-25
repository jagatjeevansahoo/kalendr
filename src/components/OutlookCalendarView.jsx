import React, { useState, useEffect } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../configs/outlook";

function OutlookCalendarView() {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [accessToken, setAccessToken] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getToken = async () => {
      if (account) {
        const request = {
          ...loginRequest,
          account: account,
        };

        try {
          const response = await instance.acquireTokenSilent(request);
          setAccessToken(response.accessToken);
        } catch (error) {
          if (error.name === "InteractionRequiredAuthError") {
            instance
              .loginPopup(loginRequest)
              .then((response) => {
                setAccessToken(response.accessToken);
              })
              .catch((e) => console.error(e));
          } else {
            console.error("Token Error", error);
          }
        }
      }
    };

    getToken();
  }, [account, instance]);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      if (accessToken) {
        try {
          const response = await fetch(
            "https://graph.microsoft.com/v1.0/me/events",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          setEvents(data.value || []);
        } catch (error) {
          console.error("Error fetching calendar events:", error);
        }
      }
    };

    fetchCalendarEvents();
  }, [accessToken]);

  if (inProgress === "login") {
    return <div>Logging in...</div>;
  }

  if (!account) {
    return (
      <button onClick={() => instance.loginRedirect(loginRequest)}>
        Outlook Calendar
      </button>
    );
  }

  return (
    <div>
      {accessToken ? (
        <div>
          <p>Logged in as {account.username}</p>
          <h2>Your Calendar Events</h2>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.subject}</strong> -{" "}
                {new Date(event.start.dateTime).toLocaleString()} to{" "}
                {new Date(event.end.dateTime).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Not Authorized.</p>
      )}
    </div>
  );
}

export default OutlookCalendarView;
