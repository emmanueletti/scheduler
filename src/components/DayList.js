import React from 'react';
import DayListItem from './DayListItem';

// props.day renamed to currentSelectedDay to differentiate from "day" variable in map action
const DayList = ({ day: currentSelectedDay, days, setDay }) => {
  // create array of individual daylistitems with passed in data from parent
  const daysComponents = days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        setDay={setDay}
        selected={day.name === currentSelectedDay}
      />
    );
  });

  return <ul>{daysComponents}</ul>;
};

export default DayList;
