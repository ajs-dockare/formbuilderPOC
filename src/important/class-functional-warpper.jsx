import { useEffect } from "react";

const observer = ({ value, didUpdate }) => {
  useEffect(() => {
    didUpdate(value);
  }, [value]);
  return null; // component does not render anything
};
