var joystick;
var ws;
var send;

//when called set the status bar to the colour inputed
function setStatus(x) {
    if (x === 'red') {
        $(".disconnected").show();
        $(".connected").hide();
        $(".connecting").hide();
    } else if (x === 'green') {
        $(".connected").show();
        $("#container").show();
        $(".disconnected").hide();
        $(".connecting").hide();
    } else if (x === 'orange') {
        $(".connecting").show();
        $(".connected").hide();
        $(".disconnected").hide();
    }
    
}


function connect(x) {
    setStatus('orange'); //connecting status
    //create joystick
    joystick = new VirtualJoystick({
	    container	: document.getElementById('container'),
	    mouseSupport	: true
	});
	//create the websocket connection based on the ip address inputed
    ws = new WebSocket(document.getElementById("ip").value);
    //when the websocket connection is opened run this function
    ws.onopen = function() {
        setStatus('green'); //set the connection status as conected
        $("#load").hide("slow"); //hide the conection interface
        
        //send the joystick position every 1/10 of a second
        send = setInterval(function(){
			ws.send(JSON.stringify({L:joystick.pwmL(), R:joystick.pwmR()}));
			
		}, 100);
    };
    
    ws.onmessage = function (e) {
    };
    //when the connection closes run this function
    ws.onclose = function() {
        setStatus('red'); //set the connection status as disconnected
        $("#load").show("slow"); //show the connection inteface
        joystick.destroy(); //remove the joystick
        clearInterval(send); //stop sending the joystick position
    };
    
    //if there is a connection error then run this function
    ws.onerror = function (error) {
        console.log('WebSocket Error ' + error); //log the error in the console
        setStatus('red'); //set the status as disconnected
        $("#load").show("slow"); //show the connection interface
        joystick.destroy(); //remove the joystick
    };
}
