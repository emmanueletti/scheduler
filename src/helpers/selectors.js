const getAppointmentsForDay = (state, day) => {
  const selectedDay = state.days.filter((element) => element.name === day);

  if (!selectedDay.length) return selectedDay;

  const result = selectedDay[0].appointments.reduce((acc, apptID) => {
    acc.push(state.appointments[apptID]);
    return acc;
  }, []);

  return result;
}

const getInterview = (state, interview) => {
  if (!interview) return null

  const interviewerID = interview.interviewer;
  const interviewerData = state.interviewers[interviewerID];

  const result = {
    ...interview,
    interviewer: {
      ...interviewerData
    }
  }

  return result
}

const getInterviewersForDay = (state, day) => {

  // console.log('state.days: ',state.days)
  const selectedDay = state.days.filter((element) => element.name === day);

  if (!selectedDay.length) return selectedDay;

  const result = selectedDay[0].interviewers.reduce((acc, apptID) => {
    acc.push(state.interviewers[apptID]);
    return acc;
  }, []);

  return result;
}

export {getAppointmentsForDay, getInterview, getInterviewersForDay}