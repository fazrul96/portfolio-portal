import React from 'react';
import {Grid2} from '@mui/material';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
//import 'react-big-calendar/lib/sass/styles.css';
//import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage = (props) => {
  // Replace the empty string with your array of events
  const events = [
    {
      title: 'Event 1',
      start: new Date(2023, 0, 1),
      end: new Date(2023, 0, 2),
    },
    // Add more events as needed
  ];

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
        <Calendar
          localizer={localizer}
          events={events} // Pass the events array
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </Grid2>
    </Grid2>
  );
};

export default CalendarPage;
