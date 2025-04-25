import React from "react";
import GoogleCalendarView from "./GoogleCalendarView";
import OutlookCalendarView from "./OutlookCalendarView";

const CalendarContainer = () => {
  return (
    <div className="calendar-container">
      <h1>My Calendar</h1>
      <div className="calendar-views">
        <div className="google-calendar">
          <h2>Google Calendar</h2>
          <GoogleCalendarView />
        </div>
        <div className="outlook-calendar">
          <h2>Outlook Calendar</h2>
          <OutlookCalendarView />
        </div>
      </div>
    </div>
  );
};

export default CalendarContainer;
