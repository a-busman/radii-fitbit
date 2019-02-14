import { display } from "display";

import * as util from "../common/utils";
import * as batt from "./batt"
import * as hr from "./hr"
import * as date from "./date"
import * as clock from "./clock"
import * as settings from "./settings"
import * as steps from "./steps"

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

settings.loadSettings();

wake();