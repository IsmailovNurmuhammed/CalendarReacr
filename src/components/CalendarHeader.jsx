import React from 'react';

const CalendarHeader = ({nextHandler, prevHandler, date, setToday}) => {

  return (
    <div className="header">
      <div className="monthDisplay">{date}</div>
      <div className="newEventButtons">
        <button
          onClick={() => prevHandler()}
          className="backButton">Back
        </button>
        <button
          onClick={setToday}
          className="backButton">Today
        </button>
        <button
          onClick={() => nextHandler()}
          className="nextButton">Next
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;