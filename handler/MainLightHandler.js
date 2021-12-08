/**
 * ls /dev/tty.* seriali esiin
 */

const DMX = require('dmx');

class MainLightHandler {
    constructor() {
        this.dmxHandler = new DMX();
        // this.dmxHandler.registerDriver('enttec-usb-dmx-pro', this);
        this.serialPort = '/dev/tty.usbserial-EN278150';

        this.universe = this.dmxHandler.addUniverse('1stUniverse', 'enttec-usb-dmx-pro', this.serialPort);
        this.universe.updateAll(0);

        this.dimmer = 0;
        this.interval = 250;

        setInterval(() => {
            this.dimmer = this.dimmer === 0 ? 255 : 0;
            this.universe.updateAll(this.dimmer);
        }, this.interval);
    }

    setFlashInterval(time) {
        this.interval = time;
    }


};

module.exports = MainLightHandler;
