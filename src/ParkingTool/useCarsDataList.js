import { useState, useCallback, useMemo } from "react";
import { carsAndSlotsInfo } from "./utils";

const noneDel = {};

export default function useCarsDataList(cars, slots, handleChange) {
  const carsData = useMemo(
    function() {
      if (parseInt(cars, 10) && parseInt(slots, 10)) {
        return carsAndSlotsInfo.getCarsInfo(cars, slots);
      }
      return [];
    },
    [cars, slots]
  );
  const [removedCars, setRemoveRow] = useState(noneDel);
  const [carsDataList, setCarsDataList] = useState(carsData);

  const handleRemoveCar = useCallback(
    function(row) {
      setRemoveRow(Object.assign({}, removedCars, { [row.id]: true }));
      carsAndSlotsInfo.addEmptySlot(row.slot_no);
      const filteresList = carsDataList.filter(function(rowdata) {
        return rowdata.id !== row.id;
      });
      // remove car
      setCarsDataList(filteresList);
      handleChange("cars")(null, filteresList.length);
    },
    [carsDataList, removedCars]
  );

  const handleAddNewCar = useCallback(
    function(carInfo) {
      const newList = carsAndSlotsInfo.appendNewCar(carsDataList, carInfo);
      setCarsDataList(newList);
      handleChange("cars")(null, newList.length);
    },
    [carsDataList]
  );

  return [carsDataList, removedCars, handleRemoveCar, handleAddNewCar];
}
