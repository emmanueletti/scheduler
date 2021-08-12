import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';

import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe('Form Component', () => {
  const interviewers = [
    {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
  ];

  // two different ways to query the DOM
  // v1 - based on idea that we test the component as users would interact with it / see it
  it('renders without student name if not provided', () => {
    // render the Form component and descruct out the needed DOM query functions from the returned object
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  // v2 - based on princicple that test should not be bound to specific implementation of a component
  // as those could change and result in brittle test suites
  // rather create and use invisible and constant handles (data-testid) specific for testing
  it('renders with initial student name', () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name='Lydia Miller-Jones' />
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });

  it('validates that the student name is not blank', () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();
    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText(/Save/));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  // not great test - do not imitate
  it('calls onSave function when the name is defined', () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { queryByText, getByText } = render(
      <Form
        interviewers={interviewers}
        name='Lydia Miller-Jones'
        onSave={onSave}
      />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText(/Save/));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', null);
  });

  // better version of above test - simulates user action and experience
  // still not good enough - do not imitate
  it('submits the name entered by the user', () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    const input = getByPlaceholderText('Enter Student Name');

    fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });
    fireEvent.click(getByText('Save'));
    fireEvent.submit(getByTestId('appointment-form'));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', null);
  });

  // best version
  // accomplishes the functionality tests of the first two components
  // mimics user interaction of the component
  // increases test coverage by calling more of the component code
  it('can successfully save after trying to submit an empty student name', () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    // user tries to save without filling out form
    fireEvent.click(getByText(/Save/));

    //assertions
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    const input = getByPlaceholderText('Enter Student Name');

    // form gets filled out
    fireEvent.change(input, { target: { value: 'Lydia Miller-Jones' } });
    // user hits save
    fireEvent.click(getByText('Save'));
    // form gets submitted
    fireEvent.submit(getByTestId('appointment-form'));

    // assertions
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', null);
  });

  it('calls onCancel and resets the input field', () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });
    fireEvent.click(getByText('Cancel'));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
