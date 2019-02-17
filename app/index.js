import { display } from "display";

import document from "document";

import * as util from "../common/utils";
import * as batt from "./batt"
import * as hr from "./hr"
import * as date from "./date"
import * as clock from "./clock"
import * as settings from "./settings"
import * as steps from "./steps"

const wholeScreen = document.getElementById("whole-screen");

function wake() {
  clock.wake();
  clock.draw();
  date.update();
  hr.draw();
  hr.start();
  steps.update();
}

function sleep() {
  clock.sleep();
  hr.stop();
}

display.addEventListener("change", function() {
  if (display.on) {
    wake();
  } else {
    sleep();
  }
});

function touchHandler() {
  console.log("touch");
  hr.showHide();
  steps.showHide();
}

settings.loadSettings();

wake();

wholeScreen.onclick = function(e) {
  console.log("touch");
  hr.showHide();
  steps.showHide();
};