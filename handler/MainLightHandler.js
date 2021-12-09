/**
 * ls /dev/tty.* seriali esiin
 */

const DMX = require('dmx');

class MainLightHandler {
  constructor () {
    this.dmxHandler = new DMX();
    // this.dmxHandler.registerDriver('enttec-usb-dmx-pro', this);
    this.serialPort = '/dev/tty.usbserial-EN278150';

    this.universe = this.dmxHandler.addUniverse('1stUniverse', 'enttec-usb-dmx-pro', this.serialPort);
    this.universe.updateAll(0);

    this.dimmer = 0;
    this.interval = 250;
    this.flasher = null;
    this.bpmInterval = 2000;
    this.currentBPM = 120;

    this.seqIsRunning = false;

    this.stepSequencer = [false, false, false, false, false, false, false, false];
    this.seqLength = 8; // 8 steps
    this.tick = 0;

    /*setInterval(() => {
        this.dimmer = this.dimmer === 0 ? 255 : 0;
        this.universe.updateAll(this.dimmer);
    }, this.interval);*/
    //this.startFlashing();
  }

  flashLight () {
    this.dimmer = this.stepSequencer[this.tick] ? 30 : 0;
    this.universe.updateAll(this.dimmer);

    this.tick = this.tick < this.stepSequencer.length - 1 ? this.tick + 1 : 0;

    setTimeout(() => {
      this.dimmer = 0;
      this.universe.updateAll(this.dimmer);
      clearInterval(this.flasher);
    }, (this.bpmInterval / 4));

    
  }

  setSteps (stepsArray) {
    this.stepSequencer = stepsArray;
  }

  setBPM (bpm) {
    this.currentBPM = bpm;
  }

  countBPMInterval () {
    this.bpmInterval = (60000 / this.currentBPM) / 4;
  }

  getRunningStatus () {
    return this.setRunningStatus;
  }

  setRunningStatus (status) {
    this.seqIsRunning = status;
  }

  clearFlasher () {
    clearInterval(this.sender);
    this.sender = null;
  }
  
  countBPM () {
    this.clearFlasher();

    this.countBPMInterval();
    console.log(this.bpmInterval);

    if (this.seqIsRunning) {
      this.sender = setInterval(() => {
        this.flashLight();
      },this.bpmInterval);
    }
  }

};

module.exports = MainLightHandler;
