import React, { useEffect, useState } from "react";

const OutlookCalendarView = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const YOUR_ACCESS_TOKEN = "secretGOCSPX-pPaPny0GzoJyqZ9XkSDhwJRWSAlc";
    const fetchOutlookEvents = async () => {
      try {
        const response = await fetch(
          "https://graph.microsoft.com/v1.0/me/events",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`, // Replace with your access token
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.value);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOutlookEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Outlook Calendar Events</h2>
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
  );
};

export default OutlookCalendarView;
