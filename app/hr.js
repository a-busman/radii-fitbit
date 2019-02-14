import document from "document";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { me } from "appbit";
import { display } from "display";

import * as util from "../common/utils";

const hrLabel = document.getElementById("heart-rate");
const hrAnim = document.getElementById("hr-anim");
const hrAnim1 = document.getElementById("hr-anim1");
const hrAnim2 = document.getElementById("hr-anim2");

const hrSym = hrAnim.getElementById("hr-img-g");
const hrImg = document.getElementById("hr-img");

let hrInterval = null;
let hrAnimated = false;
let prevHeartRate = null;
let heartRate = null;

let hrAnimsEnabled = true;

if (me.permissions.granted("access_heart_rate")) {
  var hrm = new HeartRateSensor({ frequency: 1 });
  var body = new BodyPresenceSensor();
}

export function draw() {
  heartRate = hrm.heartRate;
  if (heartRate && display.on) {
    hrImg.style.opacity = 1.0;
    if(!prevHeartRate && hrAnimsEnabled) {
      hrAnim.animate("enable");
    }
    if (!hrAnimated && hrAnimsEnabled) {
      clearInterval(hrInterval);
      prevHeartRate = heartRate;
      initHr();
      hrAnimated = true;
    }
    if (!hrAnimsEnabled && hrAnimated) {
      clearInterval(hrInterval);
      prevHeartRate = null;
      hrAnimated = false;
      hrAnim.animate("disable");
    }
  } else {
    heartRate = null;
    prevHeartRate = null;
    clearInterval(hrInterval);
    hrImg.style.opacity = 0.7;
  }
}

function initHr() {
  clearInterval(hrInterval);
  hrInterval = setInterval(animateHr, 60000/heartRate);
}

function animateHr() {
  hrAnim.animate("enable");
  if (prevHeartRate != heartRate) {
    clearInterval(hrInterval);
    if (hrAnimsEnabled) {
      prevHeartRate = heartRate;
      initHr();
    }
  }
  prevHeartRate = heartRate;
}

export function start() {
  if (me.permissions.granted("access_heart_rate")) {
    body.start();
    if (body.present) {
      hrm.start();
    }
  }
}

export function stop() {
  if (me.permissions.granted("access_heart_rate")) {
    body.stop();
    hrm.stop();
    clearInterval(hrInterval);
    hrAnimated = false;
  }
}

export function setAnimation(anims) {
  hrAnimsEnabled = anims;
  draw();
}

body.onreading = () => {
  if (!body.present) {
    hrm.stop();
    hrLabel.text = " -- ";
    clearInterval(hrInterval);
    hrAnimated = false;
  } else {
    if (me.permissions.granted("access_heart_rate")) {
      hrm.start();
    }
  }
}

hrm.onreading = () => {
  hrLabel.text = `${util.monoDigits(hrm.heartRate)}`
  draw();
}