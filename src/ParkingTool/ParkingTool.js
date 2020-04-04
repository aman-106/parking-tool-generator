import React from "react";
import ParkingInfoTable from "./ParkingInfoTable";
import { getCarsInfo } from "./utils";
import "./ParkingTool.css";

export default function ParkingTool(props) {
  const { slots = 0, cars = 0 } = props.parkingInputs;
  return (
    <div className="parking-lot">
      <div className="parking-lot__info">
        <span>{`total parking slots: ${slots}`}</span>
        <span>{`available parking slots:  ${slots - cars}`}</span>
      </div>
      <div className="parking-lot__table">
        <ParkingInfoTable data={getCarsInfo(10)} />
      </div>
    </div>
  );
}
