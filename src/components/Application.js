import React from 'react';

import 'components/Application.scss';

import DayList from 'components/DayList';
import Appointment from './Appointment';

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'
import useApplicationData from 'hooks/useApplicationData';

export default function Application() {
  
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  // console.log(state)

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  console.log('day: ', state.day)
  console.log('get appt for day: ', getAppointmentsForDay(state, state.day));
  
  const appointments = getAppointmentsForDay(state, state.day);

  const appointmentList = appointments.map((appointment, index) => {
    console.log('individual appt passed: ', appointment)
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
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
        <Appointment id='last' time='5pm'/>
      </section>
      
    </main>
  );
}
