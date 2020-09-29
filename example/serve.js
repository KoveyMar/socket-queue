/**
 *  @author [author]
 *  @version 1.0
 * 
 */
/********************************
 * 
 * @description
 *
 * this is a demo, websocket and notification of application, based on Node.js Server
 *
 * 
 *******************************/

let response_msg = 0;

let timer = null;

const ws = require('ws');

const WS_Server = new ws.Server( { port: 9000 } );

WS_Server.on('open', function(){
	console.log('node server ws connected');
});

WS_Server.on('close', function(){
	console.log('node server ws disconnected');
});

WS_Server.on('connection', function( ws ){

	console.log('SERVER CONNECTION');

	ws.on('message', function( msg ){
		console.log(` SERVER GET MESSAGE ---- [${msg}] FROM ${WS_Server.host}`);

		// timer = setInterval( () => {

			response_msg++;
			
			// response_msg > 5 && clearInterval(timer);

			console.log(` BFFORE - SERVER SEND MESSAGE FROM ${WS_Server.host}`);

			ws.send( ` node server response message is [${response_msg}] ` , (err) => {
				console.error( `SERVER SEND MESSAGE ------- ${err}` );
			});
		// }, 3*10e2);
	});
});