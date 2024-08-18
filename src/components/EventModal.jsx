import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const EventModal = ({ event, onSave, onEdit, onDelete, onClose }) => {
  const isEditing = !!event.title;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');
  const [start, setStart] = useState(event.start);
  const [end, setEnd] = useState(event.end);

  useEffect(() => {
    if (isEditing) {
      setTitle(event.title);
      setDescription(event.description || '');
      setCategory(event.category || 'Work');
      setStart(event.start);
      setEnd(event.end);
    }
  }, [event, isEditing]);

  const handleSubmit = () => {
    const newEvent = {
      id: isEditing ? event.id : new Date().getTime(),
      title,
      description,
      category,
      start,
      end,
    };

    if (isEditing) {
      onEdit(newEvent);
    } else {
      onSave(newEvent);
    }

    onClose();
  };

  const handleDelete = () => {
    onDelete(event.id);
    onClose();
  };

  return (
    <Modal
      isOpen={!!event}
      onRequestClose={onClose}
      contentLabel="Event Modal"
      className="event-modal"
      overlayClassName="event-modal-overlay"
    >
      <h2>{isEditing ? 'Edit Event' : 'Add Event'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label htmlFor="start">Start:</label>
          <input
            id="start"
            type="datetime-local"
            value={start ? new Date(start).toISOString().slice(0, 16) : ''}
            onChange={(e) => setStart(new Date(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="end">End:</label>
          <input
            id="end"
            type="datetime-local"
            value={end ? new Date(end).toISOString().slice(0, 16) : ''}
            onChange={(e) => setEnd(new Date(e.target.value))}
            required
          />
        </div>
        <div className="modal-actions">
          <button type="submit" className="btn-save">
            {isEditing ? 'Save Changes' : 'Add Event'}
          </button>
          {isEditing && (
            <button type="button" className="btn-delete" onClick={handleDelete}>
              Delete Event
            </button>
          )}
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EventModal;
