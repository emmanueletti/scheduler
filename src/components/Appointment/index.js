import React from 'react';

import 'components/Appointment/styles.scss';
import Header from 'components/Appointment/Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

const Appointment = (props) => {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_DELETE = 'ERROR_DELETE';
  const ERROR_SAVE = 'ERROR_SAVE';

  // custom hook to manage the visual state of the appointment
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
      .finally(() => props.updateSpots());
  }

  const deleteAppointment = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
      .finally(() => props.updateSpots());
  };

  const confirm = () => {
    transition(CONFIRM);
  };

  return (
    <article data-testid='appointment' className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={() => {
            transition(EDIT);
          }}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETING && <Status message={'Deleting'} />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={deleteAppointment}
          onDelete={back}
          message={'Are you sure you would like to delete'}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error message={'Could not delete'} onClose={back} />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message={'Could not edit'} onClose={back} />
      )}
    </article>
  );
};

export default Appointment;
