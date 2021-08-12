import React, { useState } from 'react';

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

const Form = (props) => {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // check if props.name is already set
  // occurs if user is editing an appointment
  const [name, setName] = useState(props.name || '');
  const [error, setError] = useState('');

  const reset = () => {
    setInterviewer(null);
    setName('');
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const validate = () => {
    if (name === '') {
      setError('Student name cannot be blank');
      return;
    }
    props.onSave(name, interviewer);
  };

  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form
          onSubmit={handleSubmit}
          autoComplete='off'
          data-testid='appointment-form'>
          <input
            className='appointment__create-input text--semi-bold'
            name={'name'}
            type='text'
            placeholder='Enter Student Name'
            value={name}
            onChange={handleChange}
            data-testid='student-name-input'
          />
          <section className='appointment__validation'>{error}</section>
          <InterviewerList
            interviewers={props.interviewers}
            value={interviewer}
            onChange={setInterviewer}
          />
        </form>
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
