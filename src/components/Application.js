import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';

import DayList from 'components/DayList';
import Appointment from './Appointment';

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors'
import useApplicationData from 'hooks/useApplicationData';

export default function Application() {
  
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const appointmentList = getAppointmentsForDay(state, state.day).map((element, index, array) => {
    // check if current element is the last one in the array
    return index === array.length - 1 ? (
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
