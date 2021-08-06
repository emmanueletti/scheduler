import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';

import DayList from 'components/DayList';
import Appointment from './Appointment';

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'

export default function Application() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: []
  });

  useEffect(() => {
    // GET data
    Promise.all([
      axios.get('/api/days'), 
      axios.get('/api/appointments'), 
      axios.get('/api/interviewers')
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => {
        return { ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data };
      });
    });
  }, []);

  const setDay = (day) => {
    setState((prev) => {
      return { ...prev, day };
    });
  };

  function bookInterview(id, interview) {
    // create the new appointments object using object copying/update pattern
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    
    // update backend data (return the promise so bookInterview fn is then-able)
    return axios.put(`/api/appointments/${id}`, {interview})
      .then((resp) => {
        // update local state upon successfull backend PUT
        setState((prev) => {
          return {
            ...prev,
            appointments,
          };
        });
      })
  }

  const cancelInterview = (id) => {

    // build update for local state
    const appointments = {
      ...state.appointments,
      [id]: {
        ...state.appointments[id],
        interview: null
      }
    }

    // make backend request to delete interview
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        // update local state upon successfull backend PUT
        setState((prev) => {
          return {
            ...prev,
            appointments,
          };
        });
      })
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day)

  const appointmentList = dailyAppointments.map((element, index) => {
    // check if current element is the last one in the array
    return index === dailyAppointments.length - 1 ? (
      <Appointment
        key='last'
        id='last'
        time={element.time}
        interview={getInterview(state, element.interview)}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    ) : (
      <Appointment
        key={index}
        {...element}
        interview={getInterview(state, element.interview)}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className='layout'>

      <section className='sidebar'>
        <img className='sidebar--centered' src='images/logo.png' alt='Interview Scheduler' />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList 
            days={state.days} 
            day={state.day} 
            setDay={setDay} 
          />
        </nav>
        <img className='sidebar__lhl sidebar--centered' src='images/lhl.png' alt='Lighthouse Labs' />
      </section>

      <section className='schedule'>
        {appointmentList}
      </section>
      
    </main>
  );
}
