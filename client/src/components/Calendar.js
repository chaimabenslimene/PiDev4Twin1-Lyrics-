import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../contexts/AuthContext';
function VoyagesCalendar() {
  const [voyages, setVoyages] = useState([]);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchVoyages() {
      if (user) {
        const response = await axios.get(`http://localhost:5000/api/cart/lamis/${user._id}`);
        setVoyages(response.data);
      }
    }

    fetchVoyages();
  }, [user]);


  const eventContent = (info) => {
    const datedepart = info.event.extendedProps.datedepart;
    const formattedDate = new Date(datedepart).toLocaleDateString();
    return (
      <>
        <b>{info.timeText}</b>
        <div>{info.event.title}</div>
        <div>{formattedDate}</div>
      </>
    );
  };

  const events = voyages.reduce((acc, voyage) => {
    const voyagesList = voyage.datedepart.map(date => ({
      //title: `${voyage.depart} - ${voyage.destination}`,
      start: new Date(date),
      end: new Date(date),
      extendedProps: { datedepart: date },
    }));
    return [...acc, ...voyagesList];
  }, []);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"600px"}
        eventContent={eventContent}
        events={events}
      />

    </div>
  );
}

export default VoyagesCalendar;
