// var socket  = io.connect('http://192.168.0.100:8000');
var socket  = io.connect('192.168.0.100:8000');
var c       = document.getElementById("myCanvas");
var ctx     = c.getContext("2d");
var cur_XY  = document.getElementById("cur_XY");
var des_XY  = document.getElementById("des_XY");
var js_data;

socket.on('connect', function() {
    console.log("Connected to server")
});

socket.on('coords', data => {
    js_data = JSON.parse(data);
    console.log(`X : ${js_data.x}, Y: ${js_data.y}`)
    cur_XY.innerHTML = `${js_data.x},${js_data.y}`
    ctx.beginPath();
    ctx.arc(js_data.x,js_data.y,10,0,2*Math.PI);
    ctx.strokeStyle = '#fc0303';
    ctx.stroke();
});


function getMousePosition(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top; 
    x = Math.round(x);
    y = Math.round(y); 
    console.log("Coordinate x: " + x,  
                "Coordinate y: " + y); 
    des_XY.innerHTML = `${x},${y}`
    socket.emit('des_event', {"x":x, "y":y });
    ctx.clearRect(0, 0, 300, 300);
    ctx.beginPath();
    ctx.arc(x,y,20,0,2*Math.PI);
    ctx.strokeStyle = '#fc0303';
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.stroke();
} 
let canvasElem = document.querySelector("canvas"); 
canvasElem.addEventListener("mousedown", function(e) 
{ 
    getMousePosition(canvasElem, e); 
}); 

/* notes
socket.on('message', data => {
    console.log(`Message received : ${data}`)
});

    // socket.emit('message', {data: 'I\'m connected!'});
*/