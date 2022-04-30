import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css"

import {useState, useEffect} from 'react';

function Calendar () {
  const [trainings, setTrainings] = useState([]);
  
  
  useEffect(()=>{
    fetchTrainings()
  },[])
  
  const fetchTrainings =()=>{
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response=> response.json())
      .then(data=> setTrainings(data))
      .catch(err=>console.error())
  }

  const eventHandler = trainings.reduce((events, training)=>{
    
    events.push({
      id: training.id,
      title: `${training.activity}`,
      start: training.date,
      description:`${training.customer.firstname} ${training.customer.lastname}`
    })
    return events
  },[])

  
    return (
      <FullCalendar
        
        
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        plugins={[dayGridPlugin, timeGridPlugin]}
        // plugins={[ dayGridPlugin]}
        // headerToolbar={true}
        initialView="dayGridMonth"
        events={eventHandler}
        
      />
    )   
}
export default Calendar