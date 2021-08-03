import React from 'react';
import cn from 'classnames';

import 'components/DayListItem.scss';

export default function DayListItem(props) {
  // dynamic class names based on props passed down
  const dayClass = cn('day-list__item', {
    'day-list__item--full': props.spots === 0,
    'day-list__item--selected': props.selected,
  });

  // event handler to change parent state
  const onClickHandler = () => {
    if (props.spots !== 0) {
      props.setDay(props.name);
    }
  };

  // format spots text
  const formatSpots = (numOfSpots) => {
    if (numOfSpots === 0) {
      return `no spots remaining`;
    }
    if (numOfSpots === 1) {
      return `1 spot remaining`;
    }
    return `${numOfSpots} spots remaining`;
  };

  return (
    <li className={dayClass} onClick={onClickHandler}>
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>
    </li>
  );
}
