
import document from "document";
import { preferences } from "user-settings";
import { units } from "user-settings";
import { user } from "user-profile";
import { me as appbit } from "appbit";
import * as fs from "fs";
import * as messaging from "messaging";

import * as date from "./date"
import * as batt from "./batt"
import * as hr from "./hr"
import * as clock from "./clock"

// SETTINGS
const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";
export let settings = loadSettings();

export function applySettings() {
  if (! loadSettings) {
   return;
  }
  
  try {
    if (settings.hasOwnProperty("animsEnabled")) {
      clock.setAnimation(!!settings.animsEnabled);
    }       
    if (settings.hasOwnProperty("hrAnimsEnabled")) {
      hr.setAnimation(!!settings.hrAnimsEnabled);
    }
    if (settings.hasOwnProperty("accentColour") && settings.accentColour) {
      clock.setColour(settings.accentColour);
    }
  } catch (ex) {
    console.log(ex);
  }
}

applySettings();

export function onsettingschange(data) {
  if (!data) {
   return;
  }
  settings = data;
  applySettings();
  clock.draw();
}

messaging.peerSocket.addEventListener("message", function(evt) {
  if (!settings) {
    settings = {};
  }
  settings[evt.data.key] = evt.data.value;
  onsettingschange(settings);
})

appbit.addEventListener("unload", saveSettings);

export function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (ex) {
    console.log(ex);
    var defaults = {
      animsEnabled: true,
    };    
    
    return defaults;
  }
}

// Save settings to the filesystem
export function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}