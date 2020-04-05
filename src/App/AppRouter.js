import React, { useCallback } from "react";
import ParkingTool from "../ParkingTool";
import ParkingSetup from "../ParkingSetup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useParkingInputs from "../ParkingSetup/useParkingInputs";
import useCarsDataList from "../ParkingTool/useCarsDataList";

export const basePath = "/";
export const pathParkingSetup = "/";
export const parkingTool = "/parking-info";

export default function AppRouter() {
  const [parkingInputs, setParkingInputs] = useParkingInputs();
  const handleChange = useCallback(
    function(name) {
      return function(event, newvalue) {
        const value =
          typeof newvalue === "number" ? newvalue : event.target.value;
        setParkingInputs(Object.assign({}, parkingInputs, { [name]: value }));
      };
    },
    [parkingInputs]
  );
  const { slots = 0, cars = 0 } = parkingInputs;
  const carsListProps = useCarsDataList(cars, slots, handleChange);

  return (
    <Router basename={basePath}>
      <Switch>
        {/*  provides the basic inputs fields for parking tool */}
        <Route
          exact
          path={pathParkingSetup}
          render={props => (
            <ParkingSetup
              {...props}
              parkingInputs={parkingInputs}
              handleChange={handleChange}
            />
          )}
        />
        {/*  shows the table for parking slots and vehciles */}

        <Route
          exact
          path={parkingTool}
          component={props => (
            <ParkingTool
              {...props}
              parkingInputs={parkingInputs}
              // handleChange={handleChange}
              carsListProps={carsListProps}
            />
          )}
        />
      </Switch>
    </Router>
  );
}
