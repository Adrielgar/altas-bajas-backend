var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var usuario = [{
    id: 12992348,
    cod_trab: 1,
    nom_trab: "Garcia Garcia, Adriel",
    ape_trab: "grimaldina",
    cargo: "Practicante",
    nom_area: "Sistemas",
    dni_trab: "71268147",
    usr_trab: "",
    psw_trab: "",
    fir_trab: "",
    fot_trab: "",
    est_trab: "",
    jefe_trab: "",
    tije_trab: "",
    acc_sir: "",
    tipo_usuario: "Practicante",
    tipo_solicitud: "Creacion de usuario",
    motivo_solicitud: "personal nuevo",
    servicios_red: " ",
    acceso_red: [" ", " ", " "],
    acceso_sistemas_administrativos: " ",
    acceso_sistemas_registrales: "",
    carpetas_compartidas: [" ", " ", " ", " "],
    jefe: ["diego alquizar", "69", "jefe"],
    sustento: " ",
    observaciones: " ",
    estado: "Generado",
    tipo_form: "ALTAS",
    pasw: '1234'
}];

var usuarioLogin = [];

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var altas_bajas = express.Router();
var auth = express.Router();

altas_bajas.get('/', (req, res) => {
    res.json(usuario);
});

/*auth.post('/register', (req, res) => {
    console.log('nice :)');
});*/
auth.post('/register', function (req, res) {
    var index = usuarioLogin.push(req.body) - 1;
    var user = usuarioLogin[index];
    user.id = index;
    var token = jwt.sign(user.id, '123'); // el secreto no debe ser hard code en la aplicación config file
    res.json({ token: token });
    // var user = req.body;
    // var token = jwt.sign(user.id, 123); // normalmente el id se obtiene de la base de datos

});

auth.post('/login', function (req, res) {
    var found = usuario.find(u => u.dni_trab === req.body.dni);
    if (found) {
        var index = usuario.findIndex(u => u.dni_trab === req.body.dni);
        if (usuario[index].pasw === req.body.pasw)
            sendToken(req.body.dni, res);
        else
            res.json({ succes: false, dni: null, token: null });
    }
    else
        res.json({ succes: false, dni: null, token: null });
});

function sendToken(dni, res) {
    var token = jwt.sign(dni, '1234');
    res.json({ succes: true, dni: dni, token: token });
}


app.use('/auth', auth);
app.use('/FormularioAccesos', altas_bajas);

app.listen(7651);

