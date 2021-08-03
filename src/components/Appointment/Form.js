import React, { useState } from 'react';

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

const Form = (props) => {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || '');

  const reset = () => {
    setInterviewer(null);
    setName('');
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const formHandleSubmit = (e) => {
    e.preventDefault();
  };

  const formHandleChange = (e) => {
    setName(e.target.value);
  };

  const saveBtnHandleClick = () => {
    setName(name);
  };
  return (
    <main className='appointment__card appointment__card--create'>
      <section className='appointment__card-left'>
        <form onSubmit={formHandleSubmit} autoComplete='off'>
          <input
            className='appointment__create-input text--semi-bold'
            name={'name'}
            type='text'
            placeholder='Enter Student Name'
            value={name}
            onChange={formHandleChange}
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className='appointment__card-right'>
        <section className='appointment__actions'>
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={saveBtnHandleClick}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
