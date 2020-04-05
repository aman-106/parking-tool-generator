import { useState } from "react";

const inputsValue = {
  cars: 10,
  slots: 15
};

export default function useParkingInputs() {
  return useState(inputsValue);
}
