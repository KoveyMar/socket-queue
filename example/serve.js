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
// var http = require('http');

// http.createServer( function( request, response ){
//   response.writeHead(200, { 'Context-Type': 'text/plain'} );

//   response.end( 'This Is Http Request Base On Node.js ' );
// }).listen(9000);
// 
let response_msg = 0;

const ws = require('ws');

const server = ws.Server;

const WS_Server = new server({
	port: 9000
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
		}, 10e3);
	});
});