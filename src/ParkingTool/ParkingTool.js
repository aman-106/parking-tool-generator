import React, { useMemo, useState } from "react";
import ParkingInfoTable from "./ParkingInfoTable";
import { getCarsInfo, colors, appendNewCar } from "./utils";
import useFilters from "./useFilters";
import useDelCar from "./useDelCar";
import Modal from "../Modal";
import useAddCar from "./useAddCar";
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
  const [
    carInfo,
    handleCarInfo,
    showAddCar,
    setShowAddCar,
    shouldAdd,
    handleShouldAddCar
  ] = useAddCar();
  const [removedCars, handleRemoveCar] = useDelCar();

  const handleSetShowAddCar = function(show) {
    if (show) {
      if (parseInt(slots, 10) - parseInt(cars, 10) > 0) setShowAddCar(show);
    } else {
      setShowAddCar(show);
    }
  };

  let carsDataList = useMemo(
    function() {
      return getCarsInfo(cars);
    },
    [cars]
  );
  carsDataList = useMemo(
    function() {
      if (!(filters.regNum || filters.color) || !appliedFilters) {
        // both are not empty
        return carsDataList;
      }
      const regex = new RegExp(".*" + filters.regNum + ".*", "i");

      return carsDataList.filter(function(rowdata) {
        if (filters.color && !filters.regNum) {
          return rowdata.color === filters.color;
        } else if (filters.regNum && !filters.color) {
          return regex.test(rowdata.car_no);
        } else {
          return rowdata.color === filters.color && regex.test(rowdata.car_no);
        }
      });
    },
    [appliedFilters]
  );

  carsDataList = useMemo(
    function() {
      if (shouldAdd) {
        return appendNewCar(carsDataList, carInfo);
      }
      return carsDataList;
    },
    [shouldAdd]
  );

  function generateBill() {}

  return (
    <div className="parking-lot">
      <div className="parking-lot__state">
        <div className="parking-lot__state__info">
          <span>{`total parking slots: ${slots}`}</span>
          <span>{`available parking slots:  ${slots - cars}`}</span>
        </div>
        <div className="parking-lot__state__actions">
          <button onClick={generateBill}>Billing</button>
          <button onClick={() => handleSetShowAddCar(true)}>Park A car</button>
        </div>
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
        <ParkingInfoTable
          data={carsDataList}
          handleRemove={handleRemoveCar}
          removedRows={removedCars}
        />
      </div>
      <Modal show={showAddCar}>
        <div className="modal-header">
          <h2>add car</h2>
          <span
            className="header__close"
            onClick={() => handleSetShowAddCar(false)}
          >
            X
          </span>
        </div>
        <div className="modal-car-info">
          <input
            className={carInfo.regNum ? "" : "error"}
            placeholder="Type Reg No"
            value={carInfo.regNum}
            onChange={handleCarInfo("regNum")}
          />
          <select
            className={carInfo.color ? "" : "error"}
            value={carInfo.color}
            onChange={handleCarInfo("color")}
          >
            <option value="">{"Select Color"}</option>
            {colors.map(function(color) {
              return <option value={color}>{color}</option>;
            })}
          </select>
        </div>
        <button onClick={handleShouldAddCar}>add</button>
      </Modal>
    </div>
  );
}
