import document from "document";

import { goals } from "user-activity"
import { today } from "user-activity"

let stepLabel = document.getElementById("step-count");
let stepRemainingLabel = document.getElementById("steps-remaining");
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
  let remainingSteps = goals.steps - today.local.steps;
  
  if (steps >= 1000) {
    stepLabel.text = `${Math.floor(steps / 1000)},${zeroPad(steps % 1000)}`;
  } else {
    stepLabel.text = `${steps}`;
  }
  
  if (remainingSteps >= 1000) {
    stepRemainingLabel.text = `${Math.floor(remainingSteps / 1000)},${zeroPad(remainingSteps % 1000)}`;
  } else if (remainingSteps <= 0) {
    stepRemainingLabel.text = "0";
  } else {
    stepRemainingLabel.text = `${remainingSteps}`;
  }
}

export function reachedGoal() {
  return today.local.steps >= goals.steps;
}