import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useInputDebounce = () => {
  // we need to create a state that will hold
  const [keyUp, setKeyUp] = React.useState(false);

  const debouncedSetKeyUp = useDebouncedCallback(() => {
    setKeyUp(true);
  }, 2000);

  return [keyUp, debouncedSetKeyUp];
};

export default useInputDebounce;
