import React from "react";
import Modal from "../Modal";
import { colors } from "./utils";

export default function AddCarSection(props) {
  const {
    carInfo,
    showAddCar,
    handleSetShowAddCar,
    handleCarInfo,
    handleShouldAddCar
  } = props;
  return showAddCar ? (
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
  ) : (
    false
  );
}
