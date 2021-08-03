import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {
  // current "day" stored in parents state
  const day = props.day;

  // setter function to change parents "day" state
  const setDay = props.setDay;

  // create array of individual daylistitems with passed in data from parent
  const days = props.days.map((el) => {
    return <DayListItem key={el.id} name={el.name} spots={el.spots} setDay={setDay} selected={el.name === day} />;
  });

  return <ul>{days}</ul>;
};

export default DayList;
