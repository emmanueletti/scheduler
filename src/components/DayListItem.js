import React from 'react';
import cn from 'classnames';

import 'components/DayListItem.scss';

export default function DayListItem({ spots, selected, name, setDay }) {
  // dynamic class names based on props passed down
  const dayClass = cn('day-list__item', {
    'day-list__item--full': spots === 0,
    'day-list__item--selected': selected,
  });

  // event handler to change parent state
  const onClickHandler = () => {
    if (spots !== 0) {
      setDay(name);
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
    <li data-testid='day' className={dayClass} onClick={onClickHandler}>
      <h2 className='text--regular'>{name}</h2>
      <h3 className='text--light'>{formatSpots(spots)}</h3>
    </li>
  );
}
