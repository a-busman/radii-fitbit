import document from "document";

import { goals } from "user-activity"
import { today } from "user-activity"

let stepLabel = document.getElementById("step-count");

function zeroPad(i) {
  if (i < 10) {
    return "00" + i;
  } else if (i < 100) {
    return "0" + i;
  }
  return i;
}

export function update() {
  let steps = today.local.steps;
  
  if (steps >= 1000) {
    stepLabel.text = `${Math.floor(steps / 1000)},${zeroPad(steps % 1000)}`;
  } else {
    stepLabel.text = `${steps}`;
  }
}

export function reachedGoal() {
  return today.local.steps >= goals.steps;
}