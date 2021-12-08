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
    this.currentBPM = 60;

    /*setInterval(() => {
        this.dimmer = this.dimmer === 0 ? 255 : 0;
        this.universe.updateAll(this.dimmer);
    }, this.interval);*/
    //this.startFlashing();

    this.countBPM();
  }

  flashLight () {
    const tick = 0;

    this.dimmer = 30;
    this.universe.updateAll(this.dimmer);

    setTimeout(() => {
      this.dimmer = 0;
      this.universe.updateAll(this.dimmer);
      clearInterval(this.flasher);
    }, 100);

    /*this.flasher = setInterval(() => {
        this.dimmer -= 2;
        this.universe.updateAll(this.dimmer);

        if (this.dimmer <= 0) {
            clearInterval(this.flasher);
        }
    }, 25);*/
  }

  setBPM (bpm) {
    this.currentBPM = bpm;
  }

  countBPMInterval () {
      this.bpmInterval = 1000 - (this.currentBPM * 1000 / 60 / 4);
    }
  
  countBPM () {
    this.countBPMInterval();

    this.sender = setInterval(() => {
      this.flashLight();
    },this.bpmInterval);
  }

};

module.exports = MainLightHandler;
