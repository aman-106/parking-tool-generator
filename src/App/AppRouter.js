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
