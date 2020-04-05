import { format } from "date-fns";
export const colors = ["black", "white", "grey"];

function getColor() {
  return colors[randomIntInRange(3)];
}

function randomIntInRange(n) {
  return Math.floor(Math.random() * n);
}

function slotsStack(slots) {
  var array = [];
  for (var i = 1; i <= slots; i++) {
    array.push(i);
  }
  return array.sort(() => Math.random() - 0.5);
}
// object for storing slots and cars when a new parking info is provided
const carsAndSlotsInfo = {
  slotsInfo: [],
  // generated  list of cars with slots
  getCarsInfo(cars, slots) {
    const carsInfo = [];
    this.slotsInfo = slotsStack(slots);
    for (let index = 0; index < cars; index++) {
      // const element = array[index];
      carsInfo.push({
        count: index + 1,
        car_no:
          "ka by " +
          randomIntInRange(cars) +
          "38" +
          randomIntInRange(cars) +
          "3",
        color: getColor(),
        slot_no: this.slotsInfo.pop(),
        date_time: format(new Date(), "PPpp"),
        id: "some-cars-num-" + index
      });
    }

    return carsInfo;
  },
  //  store the empty slot for  use
  addEmptySlot(slot) {
    this.slotsInfo.push(slot);
  },
  // add newcar info
  appendNewCar(carsInfo, newcarInfo) {
    return [
      ...carsInfo,
      {
        count: carsInfo.length + 1,
        car_no: newcarInfo.regNum,
        color: newcarInfo.color,
        // get next availble slot
        slot_no: this.slotsInfo.pop(),
        date_time: format(new Date(), "PPpp"),
        id: "some-cars-num-" + carsInfo.length
      }
    ];
  }
};

export { carsAndSlotsInfo };
