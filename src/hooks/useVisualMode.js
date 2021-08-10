import { useState } from 'react';

const useVisualMode = (initial) => {
  
  const [history, setHistory] = useState([initial]);
  
  // add a mode to the history stack
  const transition = (newMode, replace = false) => {
    // if replace is 'true' replace the last mode with the newMode instead of adding the newMode to the history
    if (replace) {
      return setHistory((prev) => {
        return [...prev.slice(0, prev.length - 1), newMode]
      });
    }
    return setHistory((prev) => [...prev, newMode]);
  };

  // update history stack without the previous mode
  const back = () => {
    if (history.length < 2) {
      return;
    }
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const mode = history[history.length - 1]

  return { mode, transition, back };
};

export default useVisualMode;
