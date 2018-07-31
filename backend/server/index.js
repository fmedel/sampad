require('./config/config');


const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const SocketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = SocketIO.listen(server);

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Configuracion global de rutas
app.use(require('./routes/index.routes'));


mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true
}, (err, res) => {

    if (err) throw err;

    console.log('Base de datos online');

});

app.use(express.static(__dirname + '/public'));

server.listen(3000, () => console.log('server on port 3000'));

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort("COM4", {
    baudRate: 9600
});
const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }));

parser.on('open', function() {
    console.log('connection is opened');
});

parser.on('data', function(data) {
    console.log(data);
    io.emit('temp', data.toString());
});

parser.on('error', (err) => console.log(err));
port.on('error', (err) => console.log(err));