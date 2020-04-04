import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { parkingTool } from "../App/AppRouter";
import useParkingInputs from "./useParkingInputs";

// const defaultFn = function() {};
export default function ParkingSetup(props) {
  const { history } = props;
  const [parkingInputs, setParkingInputs] = useParkingInputs();

  const processParkingInfo = useCallback(
    function() {
      if (
        parseInt(parkingInputs.cars, 10) <= parseInt(parkingInputs.spots, 10)
      ) {
        history.push(parkingTool);
      } else {
      }

      // history.push(parkingTool);
    },
    [history, parkingInputs]
  );

  return (
    <div className="header">
      <label htmlFor="spots">Parking Spots</label>
      <input
        type="number"
        value={parkingInputs.spots}
        onChange={setParkingInputs("spots")}
      />
      <label htmlFor="cars">Number of Cars</label>
      <input
        type="number"
        className={
          parseInt(parkingInputs.cars, 10) > parseInt(parkingInputs.spots, 10)
            ? "error"
            : ""
        }
        value={parkingInputs.cars}
        onChange={setParkingInputs("cars")}
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
