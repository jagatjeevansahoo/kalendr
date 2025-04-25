import React, { useState, useEffect } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { loginRequest } from "../configs/outlook";

function OutlookCalendarView() {
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [accessToken, setAccessToken] = useState(null);

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
            // Fallback to interaction.  Consider using Popup or Redirect based on user experience.
            instance
              .loginPopup(loginRequest)
              .then((response) => {
                setAccessToken(response.accessToken);
              })
              .catch((e) => console.error(e)); // handle login errors
          } else {
            console.error("Token Error", error);
          }
        }
      }
    };

    getToken();
  }, [account, instance]);

  if (inProgress === "login") {
    return <div>Logging in...</div>; // Or a loading spinner
  }

  if (!account) {
    return (
      <button onClick={() => instance.loginRedirect(loginRequest)}>
        Outlook calendar
      </button>
    ); // or loginPopup()
  }

  return (
    <div>
      {accessToken ? (
        <div>
          <p>Logged in as {account.username}</p>
          {/* Add functions and components to fetch/write events here, using the accessToken */}
        </div>
      ) : (
        <p>Not Authorized.</p>
      )}
    </div>
  );
}

export default OutlookCalendarView;
