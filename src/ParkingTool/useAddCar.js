import { useState, useCallback } from "react";
const emptyStr = "";

const defaultCarInfo = {
  regNum: emptyStr,
  color: emptyStr
};

export default function useAddCar() {
  const [show, setShow] = useState(false);
  const [, setShouldAdd] = useState(emptyStr);
  const [carInfo, setCarInfo] = useState(defaultCarInfo);

  const hanndleAddCar = useCallback(
    function(name) {
      return function(event) {
        const { value = emptyStr } = event.target;
        setCarInfo(Object.assign({}, carInfo, { [name]: value }));
      };
    },
    [carInfo]
  );

  const handleSetShow = useCallback(
    function(show) {
      setShow(show);
      if (show === true) {
        setShouldAdd(emptyStr);
        setCarInfo(defaultCarInfo);
      }
    },
    [show]
  );

  const checkShouldAddCar = useCallback(
    function(handleAddNewCar) {
      if (carInfo.regNum && carInfo.color) {
        let timeStamp = new Date();
        timeStamp = timeStamp.toISOString();
        setShouldAdd(timeStamp);
        setShow(false);
        handleAddNewCar && handleAddNewCar(carInfo);
      }
    },
    [carInfo]
  );

  return [
    carInfo,
    hanndleAddCar,
    show,
    handleSetShow,
    // shouldAdd,
    checkShouldAddCar
  ];
}
