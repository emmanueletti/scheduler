import axios from 'axios';
import { getAppointmentsForDay } from 'helpers/selectors';
import { useEffect, useReducer } from 'react';

// globally available actions lookup
const ACTIONS = {
  SET_STATE: 'setState',
  SET_DAY: 'setDay',
  UPDATE_SPOTS: 'updateSpots',
  ADD_INTERVIEW: 'addInterview',
  DELETE_INTERVIEW: 'removeInterview',
};

const useApplicationData = () => {
  // object lookup instead of switch statements
  const reducers = {
    [ACTIONS.SET_STATE]: (state, action) => {
      const { days, appointments, interviewers } = action.payload;
      return { ...state, days, appointments, interviewers };
    },

    [ACTIONS.SET_DAY]: (state, action) => {
      const { day } = action.payload;
      return { ...state, day };
    },

    [ACTIONS.ADD_INTERVIEW]: (state, action) => {
      const { appointments } = action.payload;
      return { ...state, appointments };
    },

    [ACTIONS.DELETE_INTERVIEW]: (state, action) => {
      const { appointments } = action.payload;
      return { ...state, appointments };
    },

    // main logic inside reduce function to prevent issue when previosuly using useState of stale state values being use
    // not sure if will be an issue with userReduce but putting it inside reduce function just in case
    [ACTIONS.UPDATE_SPOTS]: (state, action) => {
      // attach appointment objects to thier respective id's in state.day
      const appointments = getAppointmentsForDay(state, state.day);

      // count number of available spots
      const availableSpots = appointments.reduce((acc, appointment) => {
        if (!appointment.interview) {
          acc++;
        }
        return acc;
      }, 0);

      // immutably create copy of days object with the new count of available spots
      const newDays = state.days.map((day) => {
        if (day.name === state.day) {
          return {
            ...day,
            spots: availableSpots,
          };
        }
        return day;
      });

      // return the new state
      return {
        ...state,
        days: newDays,
      };
    },
  };

  const reducer = (state, action) => {
    // appropriate function looked up and immediately invoked
    return reducers[action.type](state, action) || state;
  };

  const initialState = {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // fetch data on initial render
    const fetchDays = axios.get('/api/days');
    const fetchAppointments = axios.get('/api/appointments');
    const fetchInterviewers = axios.get('/api/interviewers');
    Promise.all([fetchDays, fetchAppointments, fetchInterviewers]).then((all) => {
      const [days, appointments, interviewers] = all;

      dispatch({
        type: ACTIONS.SET_STATE,
        payload: {
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        },
      });
    });

    // empty array as useEffect dependency means useEffect will run only once on initial render
  }, []);

  const setDay = (day) => {
    dispatch({ type: ACTIONS.SET_DAY, payload: { day } });
  };

  const updateSpots = () => {
    dispatch({ type: ACTIONS.UPDATE_SPOTS });
  };

  const bookInterview = (id, interview) => {
    // immutably create copies of the new appointments object using object copying/update pattern
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // update backend data (return the promise so bookInterview fn is then-able)
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      // update local state upon successfull backend PUT
      dispatch({ type: ACTIONS.ADD_INTERVIEW, payload: { appointments } });
    });
  };

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
      dispatch({ type: ACTIONS.DELETE_INTERVIEW, payload: { appointments } });
    });
  };

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
};

export default useApplicationData;
