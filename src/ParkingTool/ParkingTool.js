import React, { useMemo, useState } from "react";
import ParkingInfoTable from "./ParkingInfoTable";
import { colors } from "./utils";
import useFilters from "./useFilters";
import useCarsDataList from "./useCarsDataList";
import useAddCar from "./useAddCar";
import BilingSection from "./BilingSection";
import AddCarSection from "./AddCarSection";
import CollectingFees from "./CollectingFees";
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
    checkShouldAddCar
  ] = useAddCar();
  const [
    carsDataList,
    removedCars,
    handleRemoveCar,
    handleAddNewCar
  ] = useCarsDataList(cars);

  function handleShouldAddCar() {
    checkShouldAddCar(handleAddNewCar);
  }
  const [showBill, handleSetShowBilling] = useState(false);
  const [selectedCarForFee, handleShowCollectingFees] = useState(false);
  const handleSetShowAddCar = function(show) {
    if (show) {
      if (parseInt(slots, 10) - parseInt(cars, 10) > 0) setShowAddCar(show);
    } else {
      setShowAddCar(show);
    }
  };

  const filterdCarsDataList = useMemo(
    function() {
      if (!(filters.regNum || filters.color) || !appliedFilters) {
        // both are not empty
        return carsDataList;
      }
      const regex = new RegExp(".*" + filters.regNum + ".*", "i");

      return carsDataList.filter(function(rowdata) {
        // filter by options for user
        if (filters.color && !filters.regNum) {
          return rowdata.color === filters.color;
        } else if (filters.regNum && !filters.color) {
          return regex.test(rowdata.car_no);
        } else {
          return rowdata.color === filters.color && regex.test(rowdata.car_no);
        }
      });
    },
    [appliedFilters, carsDataList]
  );

  const billingSectionProps = { showBill, handleSetShowBilling, removedCars };
  const addCarSectionProps = {
    carInfo,
    showAddCar,
    handleSetShowAddCar,
    handleCarInfo,
    handleShouldAddCar
  };
  const collectingFeesProps = {
    carInfo: selectedCarForFee,
    handleRemoveCar,
    handleShowCollectingFees
  };
  return (
    <div className="parking-lot">
      <div className="parking-lot__state">
        <div className="parking-lot__state__info">
          <span>{`total parking slots: ${slots}`}</span>
          <span>{`available parking slots:  ${slots - cars}`}</span>
        </div>
        <div className="parking-lot__state__actions">
          <button onClick={() => handleSetShowBilling(true)}>Billing</button>
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
            return (
              <option key={color} value={color}>
                {color}
              </option>
            );
          })}
        </select>
        <button className={"btn--primary"} onClick={handleApplyFilters}>
          search
        </button>
        <button className={"btn--secondary"} onClick={resetFilters}>
          reset
        </button>
      </div>
      <div className="parking-lot__table">
        <ParkingInfoTable
          data={filterdCarsDataList}
          handleRemove={handleShowCollectingFees}
          removedRows={removedCars}
        />
      </div>
      <AddCarSection {...addCarSectionProps} />
      <BilingSection {...billingSectionProps} />
      <CollectingFees {...collectingFeesProps} />
    </div>
  );
}
