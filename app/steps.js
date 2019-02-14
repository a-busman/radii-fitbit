import document from "document";

import { today } from "user-activity"

let stepLabel = document.getElementById("step-count");

export function update() {
  stepLabel.text = `${today.local.steps}`;
}