import document from "document";

import * as util from "../common/utils.js"
import { battery } from "power";

const battGauge = document.getElementById("charge-fg");
const battPercent = document.getElementById("charge-percent");

let prevPercent = -1;

export function updateCharge() {
  let charge = battery.chargeLevel;
  
  if (charge != prevPercent) {
    let location = (getPercentLocation(charge) / 100) * util.getScreenHeight();

    battGauge.y2 = location;
    if (charge > 40) {
      battGauge.style.fill = "fb-mint";
    } else if (charge > 20) {
      battGauge.style.fill = "fb-peach";
    } else {
      battGauge.style.fill = "fb-red";
    }
    battPercent.text = `${charge}%`;
    battPercent.y = location;
    prevPercent = charge;
  }
}

function getPercentLocation(charge) {
  return (-0.8 * charge) + 90;
}