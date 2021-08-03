import cn from 'classnames';
import React from 'react';

// CSS
import 'components/InterviewerListItem.scss';

const interviewerListItem = (props) => {
  // dynamic class names
  const interviewListItemClass = cn('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  return (
    <li className={interviewListItemClass} onClick={props.setInterviewer}>
      <img className='interviewers__item-image' src={props.avatar} alt={props.name} />
      {props.selected && props.name}
    </li>
  );
};

export default interviewerListItem;
