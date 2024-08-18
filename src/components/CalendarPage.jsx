import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EventModal from './EventModal';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [eventsData, setEventsData] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      start: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      end: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      description: 'Discuss project progress',
      category: 'Work',
    },
    {
      id: 2,
      title: 'Birthday Party',
      start: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      end: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      description: 'Celebrate with friends',
      category: 'Personal',
    },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const handleSelectSlot = ({ start, end }) => {
    setSelectedEvent({ start, end });
  };

  const handleSaveEvent = (event) => {
    setEventsData([...eventsData, event]);
    setSelectedEvent(null);
  };

  const handleEditEvent = (updatedEvent) => {
    setEventsData(eventsData.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEventsData(eventsData.filter(event => event.id !== eventId));
  };

  const filteredEvents = filterCategory === 'All'
    ? eventsData
    : eventsData.filter(event => event.category === filterCategory);

  return (
    <div className="calendar-page">
      <header className="header">
        <h1 className="header-title">Calendar</h1>
        <div className="header-controls">
          <select
            className="category-filter"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </header>

      <main className="calendar-container">
        <Calendar
          selectable
          localizer={localizer}
          defaultView="month"
          events={filteredEvents}
          style={{ height: '80vh' }}
          onSelectEvent={(event) => setSelectedEvent(event)}
          onSelectSlot={handleSelectSlot}
        />
      </main>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onSave={handleSaveEvent}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default CalendarPage;
