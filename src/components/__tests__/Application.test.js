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
} from '@testing-library/react';

// second way to use these DOM queries - import them globablly
// advantage is that you can explicitly specify the container for queries to look into
import { getByText, getAllByTestId } from '@testing-library/react';

import Application from 'components/Application';

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
    // initial render component and making sure page fully is loaded
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, /Archie Cohen/));

    // isolate an empty appointment
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    // simulate user creating a new appointment
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByTestId(appointment, 'student-name-input'), {
      target: { value: 'John Doe' },
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    // click save btn to make mocked PUT request
    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, /Saving/)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, /Saving/));
    expect(getByText(appointment, /John Doe/)).toBeInTheDocument();

    const Monday = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(Monday, 'no spots remaining')).toBeInTheDocument();
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const { container: application } = render(<Application />);

    await waitForElement(() => getByText(application, /Archie Cohen/));

    const Monday = getAllByTestId(application, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(Monday, '1 spot remaining')).toBeInTheDocument();

    // isolate Archie Cohen appointment
    const appointments = getAllByTestId(application, 'appointment');
    const appointment = appointments.find((appointment) =>
      queryByText(appointment, /Archie Cohen/)
    );

    // simulate user deleting appointment
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(
      getByText(appointment, 'Are you sure you would like to delete')
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, 'Confirm'));

    await waitForElementToBeRemoved(() => getByText(appointment, 'Deleting'));

    expect(getByAltText(appointment, 'Add')).toBeInTheDocument();
    expect(getByText(Monday, '2 spots remaining')).toBeInTheDocument();
  });

  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { container: application } = render(<Application />);
    await waitForElement(() => getByText(application, /Archie Cohen/));

    const Monday = getAllByTestId(application, 'day').find((day) =>
      queryByText(day, 'Monday')
    );
    expect(getByText(Monday, '1 spot remaining')).toBeInTheDocument();

    // isolate Archie Cohen interview
    const appointments = getAllByTestId(application, 'appointment');
    const appointment = appointments.find((appointment) =>
      queryByText(appointment, /Archie Cohen/)
    );

    // simulate user editing appointment
    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.change(getByTestId(appointment, 'student-name-input'), {
      target: { value: 'John Doe' },
    });
    fireEvent.click(getByAltText(appointment, /Tori Malcolm/));
    fireEvent.click(getByText(appointment, 'Save'));

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving'));

    // expect changes to be made and spots not to have changed
    expect(getByText(appointment, 'John Doe')).toBeInTheDocument();
    expect(getByText(Monday, '1 spot remaining')).toBeInTheDocument();
  });

  it('shows the save error when failing to save an appointment, closing the error should return to the appointment', async () => {
    // overwrite the mocked responce with a fail once
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, /Archie Cohen/));

    // isolate an empty appointment
    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    // simulate user making new appointment
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByTestId(appointment, 'student-name-input'), {
      target: { value: 'John Doe' },
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));

    await waitForElementToBeRemoved(() => getByText(appointment, 'Saving'));
    expect(getByText(appointment, 'Error')).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, 'Close'));
    expect(getByText(container, /Archie Cohen/)).toBeInTheDocument();
  });

  it('shows the delete error when failing to delete an existing appointment, closing the error should return to the appointment', async () => {
    // overwrite mocked responce with a fail - once
    axios.delete.mockRejectedValueOnce();

    const { container: application } = render(<Application />);
    await waitForElement(() => getByText(application, /Archie Cohen/));

    // isolate existing Archie Cohen interview
    const appointments = getAllByTestId(application, 'appointment');
    const appointment = appointments.find((appointment) =>
      queryByText(appointment, /Archie Cohen/)
    );

    // simulate user deleting appointment
    fireEvent.click(getByAltText(appointment, 'Delete'));
    expect(
      getByText(appointment, 'Are you sure you would like to delete')
    ).toBeInTheDocument();
    fireEvent.click(getByText(appointment, 'Confirm'));
    await waitForElementToBeRemoved(() => getByText(appointment, 'Deleting'));
    expect(getByText(appointment, 'Error')).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, 'Close'));
    expect(getByText(appointment, /Archie Cohen/)).toBeInTheDocument();
  });
});
