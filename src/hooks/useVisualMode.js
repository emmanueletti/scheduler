import { useEffect, useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // add a mode to the history stack
  const transition = (newMode, replace = false) => {
    // if replace is 'true' replace the last mode with the newMode instead of adding the newMode to the history
    if (replace) {
      return setHistory((prev) => {
        return prev.map((element, index) => (index === prev.length - 1 ? newMode : element));
      });
    }
    return setHistory((prev) => [...prev, newMode]);
  };

  // update history stack without the previous mode
  const back = () => {
    if (history.length === 1) {
      return;
    }
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  // set the mode based on change to the history state
  useEffect(() => setMode(history[history.length - 1]), [history]);

  return { mode, transition, back };
};

export default useVisualMode;
