import React from 'react';
import axios from 'axios';
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByAltText,
  getByTestId,
  waitForElementToBeRemoved,
  queryByText,
  prettyDOM,
} from '@testing-library/react';
import Application from 'components/Application';

// second way to use these DOM queries - imported them globablly
// advantage is that you can explicityly specify the container for queries to look into
import { getByText, getAllByTestId } from '@testing-library/react';

afterEach(cleanup);

describe('use Applicattion data: integration tests', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', () => {
    // first way to use these query functions
    // use the ones returned by the specific component render
    // advantage is that they come automatically scoped to that component so do not have to specific a component
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText('Monday')).then(() => {
      fireEvent.click(getByText('Tuesday'));
      expect(getByText(/Leopold Silvers/)).toBeInTheDocument();
    });
  });

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, /Archie Cohen/));

    // isolate an empty appointment
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    // click the add btn
    fireEvent.click(getByAltText(appointment, 'Add'));
    // change student name input
    fireEvent.change(getByTestId(appointment, 'student-name-input'), {
      target: { value: 'John Doe' },
    });
    // choose an interviewer
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    // click save btn to make mocked PUT request
    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, /Saving/)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, /Saving/));

    expect(getByText(appointment, /John Doe/)).toBeInTheDocument();

    const Monday = getAllByTestId(container, 'day').find((day) => queryByText(day, 'Monday'));

    expect(getByText(Monday, 'no spots remaining')).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    // render component
    const { container: application } = render(<Application />);

    // wait until 'Archie Cohen' has appeared (initial axios get request for data)
    await waitForElement(() => getByText(application, /Archie Cohen/));

    // expect monday to have 1 spot remaining based on fixture data
    const Monday = getAllByTestId(application, 'day').find((day) => queryByText(day, 'Monday'));
    expect(getByText(Monday, '1 spot remaining')).toBeInTheDocument();

    // isolate Archie Cohen appointment
    const appointments = getAllByTestId(application, 'appointment');
    const appointment = appointments.find((appointment) =>
      queryByText(appointment, /Archie Cohen/)
    );

    // click the delete btn
    fireEvent.click(getByAltText(appointment, 'Delete'));
    // expect that the confirmation prompt appears
    expect(getByText(appointment, 'Are you sure you would like to delete')).toBeInTheDocument();
    // click the confirm btn
    fireEvent.click(getByText(appointment, 'Confirm'));

    // wait for delete page to be removed
    await waitForElementToBeRemoved(() => getByText(appointment, 'Deleting'));

    // expect that add btn is now present
    expect(getByAltText(appointment, 'Add')).toBeInTheDocument();

    // expect that mondays spots has increased by 1
    expect(getByText(Monday, '2 spots remaining')).toBeInTheDocument();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    // render component
    const { container: application } = render(<Application />);

    // wait until 'Archie Cohen' has appeared (initial axios get request for data)
    await waitForElement(() => getByText(application, /Archie Cohen/));

    // expect monday to have 1 spot remaining based on fixture data
    const Monday = getAllByTestId(application, 'day').find((day) => queryByText(day, 'Monday'));
    expect(getByText(Monday, '1 spot remaining')).toBeInTheDocument();

    // isolate Archie Cohen interview
    const appointments = getAllByTestId(application, 'appointment');
    const appointment = appointments.find((appointment) =>
      queryByText(appointment, /Archie Cohen/)
    );

    // click the edit btn
    fireEvent.click(getByAltText(appointment, 'Edit'));

    // change student name
    fireEvent.change(getByTestId(appointment, 'student-name-input'), {
      target: { value: 'John Doe' },
    });
    // change interviewer
    fireEvent.click(getByAltText(appointment, /Tori Malcolm/));

    // click save btn
    fireEvent.click(getByText(appointment, 'Save'));

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving'));

    // expect changes to be made and spots not to have changed
    expect(getByText(appointment, 'John Doe')).toBeInTheDocument();
    expect(getByText(Monday, '1 spot remaining')).toBeInTheDocument();
  });

  it('shows the save error when failing to save an appointment, closing the error should return to the appointment', async () => {
    // overwrite the mocked responce with a fail once
    axios.put.mockRejectedValueOnce();

    // render component
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, /Archie Cohen/));

    // isolate an empty appointment
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    // click the add btn
    fireEvent.click(getByAltText(appointment, 'Add'));
    // change student name input
    fireEvent.change(getByTestId(appointment, 'student-name-input'), {
      target: { value: 'John Doe' },
    });
    // choose an interviewer
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    // click save btn to make mocked PUT request
    fireEvent.click(getByText(appointment, 'Save'));

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving'));

    expect(getByText(appointment, 'Error')).toBeInTheDocument();

    // click the close btn
    fireEvent.click(getByAltText(appointment, 'Close'));

    expect(getByText(container, /Archie Cohen/)).toBeInTheDocument();
  });

  it('shows the delete error when failing to delete an existing appointment, closing the error should return to the appointment', async () => {
    // overwrite mocked responce with a fail - once
    axios.delete.mockRejectedValueOnce();

    // render component
    const { container: application } = render(<Application />);

    await waitForElement(() => getByText(application, /Archie Cohen/));

    // isolate existing Archie Cohen interview
    const appointments = getAllByTestId(application, 'appointment');
    const appointment = appointments.find((appointment) =>
      queryByText(appointment, /Archie Cohen/)
    );

    // click delete btn to make mocked DELETE request
    fireEvent.click(getByAltText(appointment, 'Delete'));
    // expect that the confirmation prompt appears
    expect(getByText(appointment, 'Are you sure you would like to delete')).toBeInTheDocument();
    fireEvent.click(getByText(appointment, 'Confirm'));

    await waitForElementToBeRemoved(() => getByText(appointment, 'Deleting'));

    expect(getByText(appointment, 'Error')).toBeInTheDocument();

    // click the close btn
    fireEvent.click(getByAltText(appointment, 'Close'));

    expect(getByText(appointment, /Archie Cohen/)).toBeInTheDocument();
  });
});
