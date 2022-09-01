import React, {useState} from 'react';

const DeleteEvent = ({onDelete, onClose, event, description, modalDate, eventDate, updateEvent}) => {
  const local = JSON.parse(localStorage.getItem("events"))
  const [eventItem, setEvent] = useState(event);
  const [descriptionItem, setDescription] = useState(description);


  const search = (key, array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].date === key) {
        return array[i]
      }
    }
  }
  const changeEvent = (date) => {
    let item = search(date, local);
    console.log(item)
    item.title = eventItem;
    item.description = descriptionItem;
    console.log(eventItem);
    console.log(descriptionItem)
    localStorage.setItem("events", JSON.stringify(local));
    updateEvent(eventItem, descriptionItem)
    onClose();
  }
  return (
    <>
      <div className="deleteEventModal">
        <div>{modalDate}</div>
        <h2>Event</h2>
        {/*<p className="eventText">{event}</p>*/}
        {/*<p>{description}</p>*/}
        <input onChange={e => setEvent(e.target.value)} className="changeEvent" type="text" value={eventItem}/>
        <input onChange={e => setDescription(e.target.value)} className="changeEvent" type="text"
               value={descriptionItem}/>
        <div className="newEventButtons">
          <button
            onClick={onDelete}
            className="deleteButton">Delete
          </button>
          <button
            onClick={() => {
              changeEvent(eventDate)
            }}
            className="deleteButton">Change
          </button>
          <button
            onClick={onClose}
            className="closeButton">Close
          </button>
        </div>
      </div>
      <div className="modalBackDrop"></div>
    </>
  );
};

export default DeleteEvent;