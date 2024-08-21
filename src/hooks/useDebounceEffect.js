import { useEffect } from "react";

const useDebounceEffect = (
  callback = () => {},
  dependancies = [],
  timer = 100
) => {
  useEffect(() => {
    const timeOut = setTimeout(callback, timer);
    return () => {
      clearTimeout(timeOut);
    };
    // eslint-disable-next-line
  }, [...dependancies, callback, timer]);
};
export default useDebounceEffect;
