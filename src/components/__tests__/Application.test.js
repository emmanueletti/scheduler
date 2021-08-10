import React from 'react';
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
import Application from 'components/Application';

// second way to use these libraries - imported them globablly and scoping them to specific containers
import { getByText, getAllByTestId, prettyDOM } from '@testing-library/react';

afterEach(cleanup);

describe('use Applicattion data: integration tests', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', () => {
    // first way to use these query functions - use the ones returned by the specific component render
    // automatically scoped to that componenet so dont need to specify a container
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

    const Monday = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    expect(getByText(Monday, 'no spots remaining')).toBeInTheDocument();
  });
});
