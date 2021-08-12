import React from 'react';
import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import { PropTypes } from 'prop-types';

const InterviewerList = ({ interviewers, value, onChange }) => {
  // create array of interview list items
  const interviewerLists = interviewers.map((interview) => {
    return (
      <InterviewerListItem
        key={interview.id}
        name={interview.name}
        avatar={interview.avatar}
        setInterviewer={() => {
          onChange(interview.id);
        }}
        selected={interview.id === value}
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
