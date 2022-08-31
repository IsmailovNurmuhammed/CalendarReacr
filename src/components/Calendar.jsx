import React from 'react';
import Day from "./Day";

const Calendar = ({monthDays, setSelected}) => {
  return (
    <div className="calendar">
      {monthDays.map((day, index) => (
        <Day
          day={day}
          key={index}
          onClick={() => {
            if (day.value !== "padding") {
              setSelected(day.date)
            }
          }}
        />
      ))}
    </div>
  );
};

export default Calendar;