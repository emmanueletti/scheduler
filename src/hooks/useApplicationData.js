import axios from "axios";
import { useEffect, useState } from "react";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: [],
  });

  useEffect(() => {
    // GET data
    Promise.all([axios.get('/api/days'), axios.get('/api/appointments'), axios.get('/api/interviewers')]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => {
        return { ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data };
      });
    });
  }, []);

  const setDay = (day) => {
    setState((prev) => {
      return { ...prev, day };
    });
  };

  function bookInterview(id, interview) {
    // create the new appointments object using object copying/update pattern
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // update backend data (return the promise so bookInterview fn is then-able)
    return axios.put(`/api/appointments/${id}`, { interview }).then((resp) => {
      // update local state upon successfull backend PUT
      setState((prev) => {
        return {
          ...prev,
          appointments,
        };
      });
    });
  }

  const cancelInterview = (id) => {
    // build update for local state
    const appointments = {
      ...state.appointments,
      [id]: {
        ...state.appointments[id],
        interview: null,
      },
    };

    // make backend request to delete interview
    return axios.delete(`/api/appointments/${id}`).then(() => {
      // update local state upon successfull backend PUT
      setState((prev) => {
        return {
          ...prev,
          appointments,
        };
      });
    });
  };

  return {state, setDay, bookInterview, cancelInterview}
};

export default useApplicationData;
