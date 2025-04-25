import React, { useEffect, useState } from "react";
import { API_KEY } from "../configs/gsecrets";
import GoogleCalendarWeekView from "./GoogleCalendarWeekView";

const GoogleCalendarView = (props) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Replace with your Google Calendar API endpoint and authentication logic
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${props.accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Google Calendar Events</h2>
      <GoogleCalendarWeekView events={events} />
    </div>
  );
};

export default GoogleCalendarView;
