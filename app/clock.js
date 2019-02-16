import clock from "clock";
import document from "document";
import { preferences } from "user-settings";

import * as util from "../common/utils";
import * as batt from "./batt"
import * as date from "./date"
import * as steps from "./steps"

const hourLabel = document.getElementById("hour");
const minsLabel = document.getElementById("min");
const secDot = document.getElementById("sec-dot");
const secAnim = document.getElementById("secs-anim");
const secTrans = document.getElementById("sec-anim-transform");
const secSym = secAnim.getElementById("secs");
const minAnim = document.getElementById("mins-anim");
const minBg = document.getElementById("min-bg");
const minTrans = document.getElementById("min-anim-transform");
const minSym = minAnim.getElementById("min-bg");

const minLabelAnim = document.getElementById("min-text-anim");
const minLabelTrans = document.getElementById("min-text-anim-transform");
const minLabelSym = minLabelAnim.getElementById("min-text-g");

let secLines = document.getElementsByClassName("sec-line-g");
let smallSec = document.getElementsByClassName("sec-line-s");
let largeSec = document.getElementsByClassName("sec-line-l");

let animsEnabled = true;
let animsSetting = true;

let radius = 92;
let smallInner = -52;
let smallOuter = -55;
let largeInner = -50;
let largeOuter = -57;

let prevHour = -1;
let prevMin = -1;

let secondsDrawn = false;
let goalMetUpdated = false;

// Update the clock every second
clock.granularity = "seconds";

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes) {
  return (360 / 60) * minutes;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

// Rotate the hands every tick
function updateClock(evt) {
  let today = evt.date;
  let hours = today.getHours();
  let mins = today.getMinutes();
  let secs = today.getSeconds();
  var minsXOffset = 0;
  var minsYOffset = 7;
  var minAngle = minutesToAngle(mins);
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  }
  if (hours != prevHour) {
    hourLabel.text = `${util.monoDigits(hours)}`;
    prevHour = hours;
  }
  if (mins != prevMin) {
    minsLabel.text = `${util.monoDigits(mins)}`;
    prevMin = mins;
  }

  if (animsEnabled) {
    secTrans.from = secSym.groupTransform.rotate.angle;
    secTrans.to = secondsToAngle((secs + 1) % 60) - 90;
    if (minAngle != minSym.groupTransform.rotate.angle) {
      minTrans.from = minSym.groupTransform.rotate.angle;
      minTrans.to = minAngle;
      minLabelTrans.from = minLabelSym.groupTransform.rotate.angle;
      minLabelTrans.to = 360 - minAngle;
      if (minTrans.from > minTrans.to) {
        minTrans.from = minTrans.from - 360;
        minLabelTrans.from = minLabelTrans.from + 360;
      }
      minAnim.animate("enable");
    }
    if (secTrans.from > secTrans.to) {
      secTrans.from = secTrans.from - 360;
    }
    secAnim.animate("enable");
  } else {
    if (minAngle != minSym.groupTransform.rotate.angle) {
      minSym.groupTransform.rotate.angle = minAngle;
      minLabelSym.groupTransform.rotate.angle = 360 - minAngle;
    }
    secSym.groupTransform.rotate.angle = secondsToAngle(secs) - 90;
  }
  batt.updateCharge();
  
  date.update();
}

function drawSecondLines() {
  if (!secondsDrawn) {
    secLines.forEach(function(element, index) {
      element.groupTransform.rotate.angle = secondsToAngle(index);
    });
    smallSec.forEach(function(element) {
      element.y1 = smallInner;
      element.y2 = smallOuter;
    });
    largeSec.forEach(function(element) {
      element.y1 = largeInner;
      element.y2 = largeOuter;
    });
    secondsDrawn = true;
  }
}

function updateSecondPosition() {
  let now = new Date();
  let secs = now.getSeconds();
  
  secSym.groupTransform.rotate.angle = secondsToAngle((secs + 1) % 60) - 90;
  
}

function updateMinutePosition() {
  let now = new Date();
  let mins = now.getMinutes();
  let minAngle = minutesToAngle(mins);
  minSym.groupTransform.rotate.angle = minAngle;
  minLabelSym.groupTransform.rotate.angle = 360 - minAngle;
}

function updateSecondsColor(color) {
  smallSec.forEach(function(element) {
    element.style.fill = color;
  });
  largeSec.forEach(function(element) {
    element.style.fill = color;
  });
}

function checkGoal() {
  let goalMet = steps.reachedGoal();
  if (goalMet != goalMetUpdated) {
    if (goalMet) {
      updateSecondsColor("fb-lime");
    } else {
      updateSecondsColor("fb-white");
    }
    goalMetUpdated = goalMet;
  }
}

export function draw() {
  updateSecondPosition();
  updateMinutePosition();
  checkGoal();
}

export function setAnimation(anims) {
  animsEnabled = anims;
  animsSetting = anims;
}

export function sleep() {
  animsEnabled = false;
}

export function wake() {
  animsEnabled = animsSetting;
}

export function setColour(colour) {
  secDot.style.fill = colour;
}

// Update the clock every tick event
clock.ontick = (evt) => updateClock(evt);

drawSecondLines();
