//Pin 4 = left motor PWM
//Pin 1 = foward enable for left motor
//Pin 2 = Backward enable for left motor
//Pin 3 = Right motor PWM
//Pin 4 = Foward enable for right motor
//Pin 5 = Backward enable for right motor 

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 1234});
wss.on('connection', function(ws) {
    ws.on('message', function(e) {
        var gpio = require("pi-blaster.js");
        var wheel = JSON.parse(e);
        console.log('received: %s', wheel.toString());

      	//left  
      	if (wheel.L >= 0) {
      		if (wheel.L > 1) {
      			gpio.setPwm(4,1);
            gpio.setPwm(21,1);
            gpio.setPwm(22,0);
      		} else {
        		gpio.setPwm(4, wheel.L);
            gpio.setPwm(21,1);
            gpio.setPwm(22,0);
        	};
      	} else if (wheel.L < 0){
      		if (wheel.L < -1) {
        		gpio.setPwm(4,1);
            gpio.setPwm(21,0);
            gpio.setPwm(22,1);
        	} else {
        		gpio.setPwm(4, -(wheel.L));
            gpio.setPwm(21,0);
            gpio.setPwm(22,1);
        	};
      	};
    });
});