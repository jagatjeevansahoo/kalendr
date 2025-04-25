import React, { useState } from "react";
import "./GoogleCalendarWeekView.css";

const GoogleCalendarWeekView = ({ events }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));

  // Helper function to get the start of the week (Monday)
  function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    return new Date(date.setDate(diff));
  }

  // Helper function to get all days in the current week
  function getWeekDays(startDate) {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  }

  // Filter events for the current week
  const weekDays = getWeekDays(currentWeekStart);
  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.start.dateTime || event.start.date);
    return eventDate >= weekDays[0] && eventDate < weekDays[6];
  });

  // Navigation handlers
  const handlePreviousWeek = () => {
    const previousWeek = new Date(currentWeekStart);
    previousWeek.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeek);
  };

  // Helper to calculate event position and height
  const calculateEventStyle = (event) => {
    const start = new Date(event.start.dateTime || event.start.date);
    const end = new Date(event.end.dateTime || event.end.date);
    const startHour = start.getHours();
    const endHour = end.getHours();
    const top = (startHour / 24) * 100; // Percentage from the top
    const height = ((end - start) / (60 * 60 * 1000)) * (100 / 24); // Percentage height
    return { top: `${top}%`, height: `${height}%` };
  };

  return (
    <div className="week-view-container">
      <div className="week-navigation">
        <button onClick={handlePreviousWeek}>&larr; Previous</button>
        <h2>
          Week of {weekDays[0].toLocaleDateString()} - {weekDays[6].toLocaleDateString()}
        </h2>
        <button onClick={handleNextWeek}>Next &rarr;</button>
      </div>
      <div className="week-grid">
        {weekDays.map((day) => (
          <div key={day} className="day-column">
            <h3 className="day-header">{day.toLocaleDateString("en-US", { weekday: "long", day: "numeric" })}</h3>
            <div className="day-timeline">
              {Array.from({ length: 24 }).map((_, hour) => (
                <div key={hour} className="hour-slot">
                  <span className="hour-label">{hour}:00</span>
                </div>
              ))}
              {filteredEvents
                .filter((event) => {
                  const eventDate = new Date(event.start.dateTime || event.start.date).toDateString();
                  return eventDate === day.toDateString();
                })
                .map((event) => (
                  <div
                    key={event.id}
                    className="event-item"
                    style={calculateEventStyle(event)}
                  >
                    <strong>{event.summary}</strong>
                    <div>
                      {new Date(event.start.dateTime || event.start.date).toLocaleTimeString()} -{" "}
                      {new Date(event.end.dateTime || event.end.date).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleCalendarWeekView;
