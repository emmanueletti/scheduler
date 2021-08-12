import React from 'react';

import 'components/Application.scss';
import DayList from 'components/DayList';
import Appointment from './Appointment';
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from '../helpers/selectors';
import useApplicationData from 'hooks/useApplicationData';

const Application = () => {
  // useApplication custom hook
  const { state, setDay, bookInterview, cancelInterview, updateSpots } =
    useApplicationData();

  // selector fn's used to transform data into component ready format
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const appointments = getAppointmentsForDay(state, state.day);

  const appointmentList = appointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={getInterview(state, appointment.interview)}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        updateSpots={updateSpots}
      />
    );
  });

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img
          className='sidebar--centered'
          src='images/logo.png'
          alt='Interview Scheduler'
        />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className='sidebar__lhl sidebar--centered'
          src='images/lhl.png'
          alt='Lighthouse Labs'
        />
      </section>

      <section className='schedule'>
        {appointmentList}
        <Appointment id='last' time='5pm' />
      </section>
    </main>
  );
};

export default Application;
