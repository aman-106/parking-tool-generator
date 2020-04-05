import React from "react";
import Modal from "../Modal";
const charge = 20;

export default function BilingSection(props) {
  const { showBill, handleSetShowBilling, removedCars = {} } = props;
  let removedCarsCount = 0;
  removedCarsCount = Object.keys(removedCars).filter(
    carId => removedCars[carId]
  ).length;
  return showBill ? (
    <Modal show={showBill}>
      <div className="modal-header">
        <h2>Billing</h2>
        <span
          className="header__close"
          onClick={() => handleSetShowBilling(false)}
        >
          X
        </span>
      </div>
      <div className="billing-info">{`Rs ${removedCarsCount * charge}`}</div>
    </Modal>
  ) : (
    false
  );
}
