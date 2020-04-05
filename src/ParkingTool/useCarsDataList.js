import { useState, useCallback, useMemo } from "react";
import { getCarsInfo, appendNewCar } from "./utils";

const noneDel = {};

export default function useCarsDataList(cars) {
  const carsData = useMemo(
    function() {
      return getCarsInfo(cars);
    },
    [cars]
  );
  const [removedCars, setRemoveRow] = useState(noneDel);
  const [carsDataList, setCarsDataList] = useState(carsData);

  const handleRemoveCar = useCallback(
    function(row) {
      setRemoveRow(Object.assign({}, removedCars, { [row.id]: true }));
      const filteresList = carsDataList.filter(function(rowdata) {
        return rowdata.id !== row.id;
      });
      // remove car
      setCarsDataList(filteresList);
    },
    [carsDataList, removedCars]
  );

  const handleAddNewCar = useCallback(
    function(carInfo) {
      const newList = appendNewCar(carsDataList, carInfo);
      setCarsDataList(newList);
    },
    [carsDataList]
  );

  return [carsDataList, removedCars, handleRemoveCar, handleAddNewCar];
}
