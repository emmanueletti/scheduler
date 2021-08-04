import React from 'react';

// CSS
import 'components/Appointment/styles.scss';

import Header from 'components/Appointment/Header';
import Show from './Show';
import Empty from './Empty';

const Appointment = (props) => {
  return (
    <article className='appointment'>
      <Header time={props.time} />
      {/* since shows prop names are the same as props.interviews names, desctructering to fill its props */}
      {props.interview ? <Show {...props.interview} /> : <Empty />}
    </article>
  );
};

export default Appointment;
