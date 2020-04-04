import { format } from "date-fns";
export const colors = ["black", "white", "grey"];

function getColor() {
  return colors[randomIntInRange(3)];
}

function randomIntInRange(n) {
  return Math.floor(Math.random() * n);
}

export function getCarsInfo(cars) {
  const carsInfo = [];
  for (let index = 0; index < cars; index++) {
    // const element = array[index];
    carsInfo.push({
      count: index + 1,
      car_no:
        "ka by " + randomIntInRange(cars) + "38" + randomIntInRange(cars) + "3",
      color: getColor(),
      slot_no: index + 1,
      date_time: format(new Date(), "PPpp"),
      id: "some-cars-num-" + index
    });
  }

  return carsInfo;
}
