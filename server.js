var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var usuario = [{
    cod_trab: 1,
    nom_trab: "alicia",
    ape_trab: "grimaldina",
    cargo: "practicante",
    nom_area: "uti",
    dni_trab: "71268147",
    usr_trab: "",
    psw_trab: "",
    fir_trab: "",
    fot_trab: "",
    est_trab: "",
    jefe_trab: "",
    tije_trab: "",
    acc_sir: "",
    tipo_usuario: "practicante",
    tipo_solicitud: "creacion de usuario",
    motivo_solicitud: "personal nuevo",
    servicios_red: " ",
    acceso_red: [" ", " ", " "],
    acceso_sistemas_administrativos: " ",
    acceso_sistemas_registrales: "",
    carpetas_compartidas: [" ", " ", " ", " "],
    jefe: ["diego alquizar", "69", "jefe"],
    sustento: " ",
    observaciones: " ",
    estado: "Creado"
}];

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var altas_bajas = express.Router();
altas_bajas.get('/', (req, res) => {
    res.json(usuario);
});

app.use('/FormularioAccesos', altas_bajas);

app.listen(7651);

