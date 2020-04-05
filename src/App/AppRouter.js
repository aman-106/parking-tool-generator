import React from "react";
import ParkingTool from "../ParkingTool";
import ParkingSetup from "../ParkingSetup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useParkingInputs from "../ParkingSetup/useParkingInputs";

export const basePath = "/";
export const pathParkingSetup = "/";
export const parkingTool = "/parking-info";

export default function AppRouter() {
  const [parkingInputs, setParkingInputs] = useParkingInputs();
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
              setParkingInputs={setParkingInputs}
            />
          )}
        />
        {/*  shows the table for parking slots and vehciles */}

        <Route
          exact
          path={parkingTool}
          component={props => (
            <ParkingTool {...props} parkingInputs={parkingInputs} />
          )}
        />
      </Switch>
    </Router>
  );
}
