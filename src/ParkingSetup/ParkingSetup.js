import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { parkingTool } from "../App/AppRouter";
import "./ParkingSetup.css";

// const defaultFn = function() {};
export default function ParkingSetup(props) {
  const { history, parkingInputs, handleChange } = props;

  const processParkingInfo = useCallback(
    function() {
      if (
        parseInt(parkingInputs.cars, 10) <= parseInt(parkingInputs.slots, 10)
      ) {
        history.push(parkingTool);
      } else {
      }

      // history.push(parkingTool);
    },
    [history, parkingInputs]
  );

  return (
    <div className="parking-setup">
      <label htmlFor="slots">Parking Spots</label>
      <input
        type="number"
        value={parkingInputs.slots}
        max={30}
        min={0}
        onChange={handleChange("slots")}
      />
      <label htmlFor="cars">Number of Cars</label>
      <input
        type="number"
        className={
          parseInt(parkingInputs.cars, 10) > parseInt(parkingInputs.slots, 10)
            ? "error"
            : ""
        }
        max={30}
        min={0}
        value={parkingInputs.cars}
        onChange={handleChange("cars")}
      />
      <button onClick={processParkingInfo}>Submit</button>
    </div>
  );
}

ParkingSetup.propTypes = {
  setParkingInputs: PropTypes.func,
  parkingInputs: PropTypes.object,
  history: PropTypes.object
};
