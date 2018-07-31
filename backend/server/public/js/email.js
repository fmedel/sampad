var nodemailer = require('nodemailer');
var email = {
    'service': 'gmail',
    'auth_user': 'sampadEmail@gmail.com',
    'auth_pass': 'sampad123'
}

var transporter = nodemailer.createTransport({
    service: email.service,
    auth: {
        user: email.auth_user,
        pass: email.auth_pass
    }
});

exports.tem = function(data) {
    var mailOptions = {
        from: email.auth_user,
        to: 'felipemedelatorre@gmail.com',
        subject: 'alerta de temperatura',
        text: '¡Alerta de temperatura ' + data + '°C!, revisar el sistema'

    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return res.status(500).send({ 'Error': 'Error al enviar el email' })
        } else {
            return res.status(200).send('Email correctamente enviado')
        }
    });
}