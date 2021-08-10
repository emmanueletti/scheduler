import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {
  // current "day" stored in parents state
  const selectedDay = props.day;

  // setter function to change parents "day" state
  const setDay = props.setDay;

  // create array of individual daylistitems with passed in data from parent
  const days = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        setDay={setDay}
        selected={day.name === selectedDay}
      />
    );
  });

  return <ul>{days}</ul>;
};

export default DayList;
