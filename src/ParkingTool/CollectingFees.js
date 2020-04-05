import React from "react";
import Modal from "../Modal";
const charge = 20;
// notice for collecting parking fee
export default function CollectingFees(props) {
  const { carInfo, handleRemoveCar, handleShowCollectingFees } = props;
  function handleCollect() {
    handleShowCollectingFees(false);
    handleRemoveCar(carInfo);
  }
  return carInfo ? (
    <Modal show={carInfo}>
      <div className="modal-header">
        <h2>Billing</h2>
        <span
          className="header__close"
          onClick={() => handleShowCollectingFees(false)}
        >
          X
        </span>
      </div>
      <div className="billing-info">{`Please Collect Rs ${charge}`}</div>
      <button onClick={handleCollect}>Done</button>
    </Modal>
  ) : (
    false
  );
}
