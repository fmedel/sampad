// {temp:14.25,lux:78,lampara:0}

const socket = io();

const temperatureDisplay = document.getElementById('temperature');
const luzDisplay = document.getElementById('indicador_luz');
const lampDisplay = document.getElementById('lamp');

socket.on('temp', function (data) {
  var data_strig=data.toString();
  var arrayDeCadenas = data_strig.split(':');
  arrayDeCadenas[0] = arrayDeCadenas[0].split(',');
  arrayDeCadenas[1] = arrayDeCadenas[1].split(',');
  arrayDeCadenas[2] = arrayDeCadenas[2].split(',');
  var temp = arrayDeCadenas[1][0];
  var luz = arrayDeCadenas[2][0];
  var lampara = arrayDeCadenas[3][0];

console.log(luz);
  temperature.innerHTML = `${temp}`;
  indicador_luz.innerHTML = `${luz}`;
  lamp.innerHTML = `${lampara}`;

});
