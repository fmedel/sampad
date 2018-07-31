const express = require('express');
const Dato = require('../models/datos');

const app = express();

app.get('/datos', function(req, res) {

    Dato.find({})
        .exec((err, Datos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            Dato.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    Datos,
                    length: conteo
                })
            });

        })

})


app.post('/datos', function(req, res) {
    let body = req.body;

    let dato = new Dato({
        temperatura: body.temperatura,
        luz: body.luz,
        lampara: body.lampara,
        fecha: body.fecha
    });

    dato.save((err, DatoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            Dato: DatoDB
        })

    });

})

app.put('/datos/:id', function(req, res) {
    let id = req.params.id;
    let body = req.body;

    Dato.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, DatoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Dato: DatoDB
        })
    });
})

app.delete('/datos/:id', function(req, res) {

    let id = req.params.id;

    // Eliminar registro
    Dato.findByIdAndRemove(id, (err, DatoBorrado) => {

        // Cambiar estado del registro
        // Dato.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, DatoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            Dato: DatoBorrado
        })
    });

})

module.exports = app;