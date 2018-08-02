require('../config/config');

let axios = require('axios');

const ax = axios.create({
    baseURL: 'http://localhost:3000'
})

function obtenerDatos() {
    return ax.get('/datos')
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error);
        });
}

function addDatos(data) {

    var data_strig = data.toString();
    var arrayDeCadenas = data_strig.split(':');
    arrayDeCadenas[0] = arrayDeCadenas[0].split(',');
    arrayDeCadenas[1] = arrayDeCadenas[1].split(',');
    arrayDeCadenas[2] = arrayDeCadenas[2].split(',');
    var temp = parseFloat(arrayDeCadenas[1][0]).toFixed(1);
    var lux = parseFloat(arrayDeCadenas[2][0]).toFixed(1);
    var lamp = parseFloat(arrayDeCadenas[3][0]);
    if (lamp == 0) {
        lamp = false;
    } else {
        lamp = true;
    }

    var currentdate = new Date();

    return ax.post('/datos', {
        temperatura: temp,
        luz: lux,
        lampara: lamp,
        fecha: currentdate
    })

}

module.exports = {
    obtenerDatos,
    addDatos
}