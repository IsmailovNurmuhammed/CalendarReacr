import React, {useEffect, useState} from "react";
import "./App.css";
import CalendarHeader from "./components/CalendarHeader";
import Calendar from "./components/Calendar";
import Modal from "./components/Modal";
import DeleteEvent from "./components/DeleteEvent";

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function App() {

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [monthDays, setMonthDays] = useState([]);
  const [selected, setSelected] = useState();
  const [events, setEvents] = useState(localStorage.getItem("events")
    ? JSON.parse(localStorage.getItem("events"))
    : []);
  const [currentDate, setCurrentDate] = useState("");

  const eventForDate = (date) => events.find(e => e.date === date);
  const setToday = () => {
    setCurrentMonth(new Date().getMonth());
  }
  const search = (key, array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].date === key) {
        return array[i]
      }
    }
  }
  const updateDays = () => {
    console.log('updates')
    const date = new Date();

    if (currentMonth !== 0) {
      date.setMonth(new Date().getMonth());
    }

    const day = date.getDate();
    let month = currentMonth;
    const year = date.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayInMonth = new Date(year, month, daysInMonth);
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    setCurrentDate(firstDayOfMonth.toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
    const emptyDays = weekdays.indexOf(dateString.split(', ')[0]);
    console.log(dateString.split(', '[0]))
    const daysArr = [];
    for (let i = 1; i <= emptyDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - emptyDays}/${year}`;

      if (i > emptyDays) {
        daysArr.push({
          value: i - emptyDays,
          event: eventForDate(dayString),
          isCurrentDay: (i - emptyDays === day) && currentMonth === new Date().getMonth(),
          date: dayString,
        })
      } else {
        daysArr.push({
          value: "padding",
          event: null,
          isCurrentDay: false,
          date: '',
        })
      }
    }
    setMonthDays(daysArr);
  }

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);
  useEffect(() => {
    updateDays()
  }, [events, currentMonth, currentDate, localStorage]);
  return (
    <>
      <div>
        <div className="container">
          <CalendarHeader
            setToday={setToday}
            nextHandler={() => {
              setCurrentMonth(currentMonth + 1)
            }}
            prevHandler={() => {
              setCurrentMonth(currentMonth - 1)
            }}
            date={currentDate}/>
          <div className="weekdays">
            {weekdays.map((week, index) => (
              <div key={index}>{week}</div>
            ))}
          </div>
          <Calendar setSelected={setSelected} monthDays={monthDays}/>
        </div>
      </div>
      {
        selected && !eventForDate(selected) && (
          <Modal
            modalDate={selected.toLocaleString()}
            onClose={() => setSelected(null)}
            onSave={(title, description) => {
              setEvents([...events, {date: selected, title: title, description: description}])
              setSelected(null);
            }}
          />
        )
      }
      {
        selected && eventForDate(selected) && (
          <DeleteEvent
            updateEvent={(title, description) => {
              const event = search(selected, events)
              setEvents([...events, event.title = title, event.description = description])
              setSelected(null);
            }}
            currentMonth={currentMonth}
            eventDate={selected}
            modalDate={selected.toLocaleString()}
            event={eventForDate(selected).title}
            description={eventForDate(selected).description}
            onClose={() => setSelected(null)}
            onDelete={() => {
              setEvents(events.filter(e => e.date !== selected))
              setSelected(null);
            }}
          />
        )
      }
    </>
  );
}

export default App;
