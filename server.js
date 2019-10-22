var express = require('express');
var app = express();
var bodyParser = require('body-parser');
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
    tipo_form: "ALTAS"
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

