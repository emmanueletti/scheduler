import cn from 'classnames';
import React from 'react';

import 'components/InterviewerListItem.scss';

const interviewerListItem = ({ selected, setInterviewer, avatar, name }) => {
  const interviewListItemClass = cn('interviewers__item', {
    'interviewers__item--selected': selected,
  });

  return (
    <li className={interviewListItemClass} onClick={setInterviewer}>
      <img className='interviewers__item-image' src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default interviewerListItem;
