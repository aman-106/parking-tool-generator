import React, { useMemo } from "react";
import ParkingInfoTable from "./ParkingInfoTable";
import { getCarsInfo, colors } from "./utils";
import useFilters from "./useFilters";
import "./ParkingTool.css";

export default function ParkingTool(props) {
  const { slots = 0, cars = 0 } = props.parkingInputs;
  const [
    filters,
    appliedFilters,
    handleFilters,
    handleApplyFilters,
    resetFilters
  ] = useFilters();
  let data = useMemo(
    function() {
      return getCarsInfo(10);
    },
    [cars]
  );
  data = useMemo(
    function() {
      if (!(filters.regNum || filters.color) || !appliedFilters) {
        // both are not empty
        return data;
      }
      const regex = new RegExp("^.*" + filters.regNum + ".*", "i");

      return data.filter(function(rowdata) {
        if (filters.color && !filters.regNum) {
          return rowdata.color === filters.color;
        } else if (filters.regNum && !filters.color) {
          return regex.test(rowdata.car_no);
        } else {
          return rowdata.color === filters.color && regex.test(rowdata.car_no);
        }

        return false;
      });
    },
    [appliedFilters]
  );
  return (
    <div className="parking-lot">
      <div className="parking-lot__info">
        <span>{`total parking slots: ${slots}`}</span>
        <span>{`available parking slots:  ${slots - cars}`}</span>
      </div>
      <div className="parking-lot__filters">
        <input
          placeholder="Type Reg No"
          value={filters.regNum}
          onChange={handleFilters("regNum")}
        />
        <select value={filters.color} onChange={handleFilters("color")}>
          <option value="">{"Select Color"}</option>
          {colors.map(function(color) {
            return <option value={color}>{color}</option>;
          })}
        </select>
        <button onClick={handleApplyFilters}> search</button>
        <button onClick={resetFilters}>reset</button>
      </div>
      <div className="parking-lot__table">
        <ParkingInfoTable data={data} />
      </div>
    </div>
  );
}
