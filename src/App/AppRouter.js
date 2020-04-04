import React from "react";
import ParkingTool from "../ParkingTool";
import ParkingSetup from "../ParkingSetup";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const basePath = "/";
export const pathParkingSetup = "/";
export const parkingTool = "/parking-info";

export default function AppRouter() {
  return (
    <Router basename={basePath}>
      <Route exact path={pathParkingSetup} component={ParkingSetup} />
      <Route exact path={parkingTool} component={ParkingTool} />
    </Router>
  );
}
