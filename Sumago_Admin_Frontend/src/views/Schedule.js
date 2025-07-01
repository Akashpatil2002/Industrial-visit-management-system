import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { FaRegClock, FaCalendarAlt, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    Schedule_Title: '',
    Schedule_Description: '',
    Schedule_Date: '',
    Schedule_StartTime: '',
    Schedule_EndTime: '',
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:1010/U1/AdminScheduleReg');
      const formattedEvents = response.data.schedules.map(schedule => ({
        title: schedule.Schedule_Title,
        description: schedule.Schedule_Description,
        start: new Date(schedule.Schedule_Date + 'T' + schedule.Schedule_StartTime),
        end: new Date(schedule.Schedule_Date + 'T' + schedule.Schedule_EndTime),
        id: schedule._id,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const handleSelectSlot = (slotInfo) => {
    setFormData({
      Schedule_Title: '',
      Schedule_Description: '',
      Schedule_Date: moment(slotInfo.start).format('YYYY-MM-DD'),
      Schedule_StartTime: moment(slotInfo.start).format('HH:mm'),
      Schedule_EndTime: moment(slotInfo.end).format('HH:mm'),
    });
    setEditingEvent(null);
    setModalIsOpen(true);
  };

  const handleEventClick = (event) => {
    setEditingEvent(event);
    setFormData({
      Schedule_Title: event.title,
      Schedule_Description: event.description,
      Schedule_Date: moment(event.start).format('YYYY-MM-DD'),
      Schedule_StartTime: moment(event.start).format('HH:mm'),
      Schedule_EndTime: moment(event.end).format('HH:mm'),
    });
    setModalIsOpen(true);
  };

  const handleDelete = async () => {
    if (editingEvent && window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:1010/U1/AdminScheduleDel/${editingEvent.title}`);
        fetchSchedules();
        toast.info('Event deleted successfully');
        closeModal();
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error('Failed to delete event');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingEvent) {
      const confirmUpdate = window.confirm('Are you sure you want to update this event?');
      if (!confirmUpdate) return;
    }
    try {
      if (editingEvent) {
        await axios.put(`http://localhost:1010/U1/AdminScheduleupdate/${editingEvent.title}`, formData);
        toast.success('Event updated successfully');
      } else {
        await axios.post('http://localhost:1010/U1/AdminSchedulepost', formData);
        toast.success('Event added successfully');
      }
      fetchSchedules();
      closeModal();
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormData({
      Schedule_Title: '',
      Schedule_Description: '',
      Schedule_Date: '',
      Schedule_StartTime: '',
      Schedule_EndTime: '',
    });
    setEditingEvent(null);
  };

  const Event = ({ event }) => (
    <span>
      <strong>{event.title}</strong>
      {event.description && (
        <>
          <br />
          <span>{event.description}</span>
        </>
      )}
    </span>
  );

  return (
    <Card style={{ margin: '20px' }}>
      <Card.Body>
        <Card.Title as="h4" style={{ fontFamily: "Georgia, serif" , fontWeight:"bold"}}>AGENDA</Card.Title>
        <p className="card-category">Agenda Information</p>
        <Button variant="primary" style={{marginTop:"10px"}} onClick={() => {
          setModalIsOpen(true);
          setEditingEvent(null);
        }}>
          <FaPlus className="me-2"  /> Add Agenda
        </Button>
        <div style={{ height: '550px', margin: '20px 0' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: '100%' }}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleEventClick}
            selectable
            components={{ event: Event }}
          />
        </div>

        <Modal show={modalIsOpen} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title className="d-flex align-items-center">
              {editingEvent ? <FaEdit className="me-2" /> : <FaPlus className="me-2" />}
              {editingEvent ? 'Edit Schedule' : 'Add Schedule'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formScheduleTitle">
                <Form.Label>📌 Title</Form.Label>
                <Form.Control
                  type="text"
                  name="Schedule_Title"
                  value={formData.Schedule_Title}
                  onChange={e => setFormData({ ...formData, Schedule_Title: e.target.value })}
                  placeholder="Enter title"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formScheduleDescription">
                <Form.Label>📝 Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="Schedule_Description"
                  value={formData.Schedule_Description}
                  onChange={e => setFormData({ ...formData, Schedule_Description: e.target.value })}
                  placeholder="Optional description..."
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formScheduleDate">
                <Form.Label><FaCalendarAlt className="me-2" />Date</Form.Label>
                <Form.Control
                  type="date"
                  name="Schedule_Date"
                  value={formData.Schedule_Date}
                  onChange={e => setFormData({ ...formData, Schedule_Date: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formScheduleStartTime">
                <Form.Label><FaRegClock className="me-2" />Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="Schedule_StartTime"
                  value={formData.Schedule_StartTime}
                  onChange={e => setFormData({ ...formData, Schedule_StartTime: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formScheduleEndTime">
                <Form.Label><FaRegClock className="me-2" />End Time</Form.Label>
                <Form.Control
                  type="time"
                  name="Schedule_EndTime"
                  value={formData.Schedule_EndTime}
                  onChange={e => setFormData({ ...formData, Schedule_EndTime: e.target.value })}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button variant="primary" type="submit">
                  {editingEvent ? 'Update' : 'Add'}
                </Button>
                {editingEvent && (
                  <Button variant="danger" type="button" onClick={handleDelete}>
                    <FaTrash className="me-1" /> Delete
                  </Button>
                )}
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer position="top-right" autoClose={3000} />
      </Card.Body>
    </Card>
  );
};

export default Schedule;
