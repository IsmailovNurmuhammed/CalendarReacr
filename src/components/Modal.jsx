import React, {useState} from 'react';

const Modal = ({onSave, onClose, modalDate}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);
  return (
    <>
      <div className="newEventModal">
        <div>{modalDate}</div>
        <h2>New Event</h2>
        <input
          className={`${error ? "error" : ""}} eventTitleInput`}
          onChange={e => setTitle(e.target.value)}
          value={title}
          placeholder="Event Title"/>
        <textarea
          rows="5"
          className={`${error ? "error" : ""}} eventDescriptionInput`}
          onChange={e => setDescription(e.target.value)}
          value={description}
          placeholder="Event Description..."/>
        <div className="newEventButtons">
          <button
            onClick={() => {
              if (title) {
                setError(false);
                onSave(title, description);
              } else {
                setError(true);
              }
            }}
            className="saveButton">Save
          </button>
          <button
            onClick={onClose}
            className="cancelButton">Cancel
          </button>
        </div>
      </div>
      <div className="modalBackDrop"></div>
    </>
  );
};

export default Modal;