import React, { useState } from 'react';

// CSS
import 'components/Application.scss';

// child components
import DayList from 'components/DayList';

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
      <section className='schedule'>{/* Replace this with the schedule elements durint the "The Scheduler" activity. */}</section>
    </main>
  );
}
