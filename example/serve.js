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
		console.log(` SERVER SEND MESSAGE ---- [${MSG}] FROM ${WS_Server}`);

		setTimeout( () => {

			response_msg++;

			ws.send( ` response msg ${response_msg} ` , (err) => {
				console.error( `SERVER SEND MESSAGE IS ERROR ------- ${err}` );
			});
		}, 10e2);
	});
});