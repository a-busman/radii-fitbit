import document from "document";
import * as util from "../common/utils";
import { preferences } from "user-settings";

const dowLabel = document.getElementById("dow");
const dateLabel = document.getElementById("date");
const dowCircles = document.getElementsByClassName("dow-circle");

const smallCircleRadius = 4;
const largeCircleRadius = 10;

let lastDate = 0;

function updateLabelPos(firstDay, day) {
  let screenHeight = util.getScreenHeight();
  
  let multiplier = firstDay ? (day == 0 ? 6 : (day - 1)) : day;
  
  switch (multiplier) {
    case 0:
      return (screenHeight * 0.1) + 6;
    case 1:
      return (screenHeight * 0.23) + 6;
    case 2:
      return (screenHeight * 0.36) + 6;
    case 3:
      return (screenHeight * 0.5) + 6;
    case 4:
      return (screenHeight * 0.63) + 6;
    case 5:
      return (screenHeight * 0.76) + 6;
    case 6:
      return (screenHeight * 0.9) + 6;
  }
  
  return 0;
}

export function update() {
  let now = new Date();
  let day = now.getDay();
  let firstDay = preferences.firstDayOfWeek;
  let dayElem = document.getElementById("day" + (day + (firstDay ? 0 : 1)));
  let date = now.getDate();
  let screenHeight = util.getScreenHeight();
  
  if (date == lastDate) {
    return;
  }
  dowCircles.forEach(function(element) {
    element.r = smallCircleRadius;
  });

  lastDate = date;
  dateLabel.text = `${util.monoDigits(date)}`;
  switch(day) {
    case 0:
      dowLabel.text = "S";
      break;
    case 1:
      dowLabel.text = "M";
      break;
    case 2:
      dowLabel.text = "T";
      break;
    case 3:
      dowLabel.text = "W";
      break;
    case 4:
      dowLabel.text = "T";
      break;
    case 5:
      dowLabel.text = "F";
      break;
    case 6:
      dowLabel.text = "S";
      break;
  }
  dowLabel.y = updateLabelPos(firstDay, day);
  dateLabel.y = updateLabelPos(firstDay, day);
  dayElem.r = largeCircleRadius;
}