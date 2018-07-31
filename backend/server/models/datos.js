const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let datosSchema = new Schema({
    temperatura: {
        type: Number,
        required: [true, 'La temperatura es obligatorio']
    },
    luz: {
        type: Number,
        required: [true, 'La lux es obligatorio']
    },
    lampara: {
        type: Boolean,
        required: [true, 'La lampara es obligatorio']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatorio']
    }
});

datosSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('Datos', datosSchema);