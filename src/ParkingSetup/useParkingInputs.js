import { useState, useCallback } from "react";

const inputsValue = {
  cars: 0,
  spots: 0
};

export default function useParkingInputs() {
  const [parkingInputs, setParkingInputs] = useState(inputsValue);

  const handleChange = useCallback(
    function(name) {
      return function(event) {
        const { value = 0 } = event.target;
        setParkingInputs(Object.assign({}, parkingInputs, { [name]: value }));
      };
    },
    [parkingInputs]
  );

  return [parkingInputs, handleChange];
}
