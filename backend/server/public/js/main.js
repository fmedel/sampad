//para enviar email
var email=require('./email')

const socket = io();

const temperatureDisplay = document.getElementById('temperature');
const luzDisplay = document.getElementById('indicador_luz');
// const lampDisplay = document.getElementById('lamp');
const alert = document.getElementById('alert');
alert.style.display = 'none';

// Arreglos para los promedios
const tempAverageArray = [];
const luzAverageArray = [];

// Obtener el elemento del grafico
var ctxTemperature = document.getElementById('line-chart-temperature').getContext('2d')
var ctxLux = document.getElementById('line-chart-lux').getContext('2d')

document.getElementById("temperatureGraph").style.height = '300px';
document.getElementById("luxGraph").style.height = '300px';

// opciones de graficos
var optionsTemperature = {
    title: {
        display: true,
        text: 'Historico de 20 datos de Temperatura (°C)'
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    annotation: {
        annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '25',
            borderColor: 'black',
            borderWidth: 5
        }]
    }
}
var optionsLux = {
    title: {
        display: true,
        text: 'Historico de 20 datos de Luz (Lux)'
    },
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    annotation: {
        annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '750',
            borderColor: 'black',
            borderWidth: 5
        }]
    }
}

// Datos de los graficos
var dataChartLux = {
    labels: [0],
    datasets: [{
        data: [0],
        label: 'Cantidad de Luz (Lux)',
        backgroundColor: '#00ff00'
    }]
}
var dataChartTemperature = {
    labels: [0],
    datasets: [{
        data: [0],
        label: 'Temperatura (°C)',
        backgroundColor: '#00ff00'
    }]
}

// Crear los graficos
var chartsTemperature = new Chart(ctxTemperature, {
    type: 'line',
    data: dataChartTemperature,
    options: optionsTemperature
})

var chartsLux = new Chart(ctxLux, {
    type: 'line',
    data: dataChartLux,
    options: optionsLux
})


// Socket
socket.on('temp', function(data) {
    var data_strig = data.toString();
    var arrayDeCadenas = data_strig.split(':');
    arrayDeCadenas[0] = arrayDeCadenas[0].split(',');
    arrayDeCadenas[1] = arrayDeCadenas[1].split(',');
    arrayDeCadenas[2] = arrayDeCadenas[2].split(',');
    var temp = parseFloat(arrayDeCadenas[1][0]).toFixed(1);
    var luz = parseFloat(arrayDeCadenas[2][0]).toFixed(1);
    var lampara = parseFloat(arrayDeCadenas[3][0]).toFixed(1);

    var currentdate = new Date();
    var time = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();

    // Comprobar si está dentro del rango
    if (temp >= 25) {
        dataChartTemperature.datasets[0].backgroundColor = '#ff0000';
    } else {
        dataChartTemperature.datasets[0].backgroundColor = '#00ff00';
    }
    //manda alerta por temperature
    if (temp > 30) {
      email.tem(tem) //envia email de alerta 
    }
    if (luz >= 750) {
        dataChartLux.datasets[0].backgroundColor = '#ff0000';
    } else {
        dataChartLux.datasets[0].backgroundColor = '#00ff00';
    }
    if (temp >= 25 || luz >= 750) {
        document.getElementById("estado").className = "estado-error";
        alert.innerHTML = '<strong>La ampolleta se ha apagado</strong>, volverá a prenderse cuando los valores estén dentro de los parámetros.';
        alert.style.display = 'inline';
    } else {
        document.getElementById("estado").className = "estado-ok";
        alert.style.display = 'none';
    }

    // Comprobar si hay màs de 20 datos mostrados en el grafico
    if (dataChartTemperature.labels.length >= 20) {
        dataChartTemperature.datasets[0].data.shift();
        dataChartTemperature.labels.shift();
    }
    if (dataChartLux.labels.length >= 20) {
        dataChartLux.datasets[0].data.shift();
        dataChartLux.labels.shift();
    }
    // Añadir datos a los graficos
    dataChartTemperature.labels.push(time);
    dataChartTemperature.datasets[0].data.push(temp);
    dataChartLux.labels.push(time);
    dataChartLux.datasets[0].data.push(luz);

    // Actualizar graficos
    chartsTemperature.update();
    chartsLux.update();


    // Comprobar si hay más de 60 datos en el promedio
    if (tempAverageArray.length >= 60) {
        tempAverageArray.shift();
    }
    if (luzAverageArray.length >= 60) {
        luzAverageArray.shift();
    }
    // Al promedio
    tempAverageArray.push(temp);
    luzAverageArray.push(luz);

    const tempAverage = obtenerPromedio(tempAverageArray);
    const luzAverage = obtenerPromedio(luzAverageArray);

    temperature.innerHTML = `T° promedio/minuto: ${tempAverage}`;
    indicador_luz.innerHTML = `Lux promedio/minuto: ${luzAverage}`;
    // lamp.innerHTML = `${lampara}`;

});

function obtenerPromedio(array) {
    var x = 0;
    array.forEach(element => {
        x = x + parseFloat(element);
    });
    return (x / array.length).toFixed(2);
}
