/**
 * Function gives an array of appointments fopr a given day.
 * @param {object} state - The state object with day, days, appointments, and interviewers properties
 * @param {String} day - The string representing the day
 * @returns {Array} An array of the appointment objects for a given day
 */
const getAppointmentsForDay = (state, day) => {
  const selectedDay = state.days.filter((element) => element.name === day);

  if (!selectedDay.length) {
    return selectedDay;
  }

  const result = selectedDay[0].appointments.reduce((acc, apptID) => {
    acc.push(state.appointments[apptID]);
    return acc;
  }, []);

  return result;
};

/**
 * Function turns the state interview object into one useable by the components.
 * Replaces the interviewer ID with its respective interview object
 * @param {Object} state - The state object with day, days, appointments, and interviewers properties
 * @param {Object} interview - Object with data for a particular interview
 * @returns An object with the interviewers data attached || null
 */
const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  }

  const interviewerID = interview.interviewer;
  const interviewerData = state.interviewers[interviewerID];

  const result = {
    ...interview,
    interviewer: {
      ...interviewerData,
    },
  };

  return result;
};

/**
 * Function gives an array for interviewers for a specific day
 * @param {*} state - The state object with day, days, appointments, and interviewers properties
 * @param {*} day - The string representing the day
 * @returns {Array} An array of objects each containing interviewer objects
 */
const getInterviewersForDay = (state, day) => {
  const selectedDay = state.days.filter((element) => element.name === day);

  if (!selectedDay.length) {
    return selectedDay;
  }

  const result = selectedDay[0].interviewers.reduce((acc, apptID) => {
    acc.push(state.interviewers[apptID]);
    return acc;
  }, []);

  return result;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
