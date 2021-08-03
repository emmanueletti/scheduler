import React, { useState } from 'react';

import 'components/Application.scss';

import DayList from 'components/DayList';
import Appointment from './Appointment';

const appointments = [
  {
    id: 1,
    time: '12pm',
  },
  {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  {
    id: 3,
    time: '2pm',
  },
  {
    id: 4,
    time: '3pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 1,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  {
    id: 5,
    time: '4pm',
  },
];

export default function Application(props) {
  // fake data - would be from an API request
  const days = [
    {
      id: 1,
      name: 'Monday',
      spots: 2,
    },
    {
      id: 2,
      name: 'Tuesday',
      spots: 5,
    },
    {
      id: 3,
      name: 'Wednesday',
      spots: 0,
    },
  ];

  // create state hooks for currently selected day
  const [day, setDay] = useState('Monday');

  const appointmentList = appointments.map((element, index) => {
    if (index === appointments.length - 1) {
      return <Appointment key='last' id='last' time={element.time} interview={element.interview} />;
    }
    return <Appointment key={index} {...element} />;
  });

  return (
    <main className='layout'>
      <section className='sidebar'>
        <img className='sidebar--centered' src='images/logo.png' alt='Interview Scheduler' />
        <hr className='sidebar__separator sidebar--centered' />
        <nav className='sidebar__menu'>
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img className='sidebar__lhl sidebar--centered' src='images/lhl.png' alt='Lighthouse Labs' />
      </section>
      <section className='schedule'>{appointmentList}</section>
    </main>
  );
}
