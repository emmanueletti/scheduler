import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import { PropTypes } from 'prop-types';

const InterviewerList = (props) => {
  // create array of interview list items
  const interviewerLists = props.interviewers.map((el) => {
    return (
      <InterviewerListItem
        key={el.id}
        name={el.name}
        avatar={el.avatar}
        setInterviewer={() => {
          props.onChange(el.id);
        }}
        selected={el.id === props.value}
      />
    );
  });

  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>{interviewerLists}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
