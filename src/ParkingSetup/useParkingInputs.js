import { useState, useCallback } from "react";

const inputsValue = {
  cars: 0,
  slots: 0
};

export default function useParkingInputs() {
  return useState(inputsValue);
}
