var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var randtoken = require('rand-token');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var cors = require('cors');

var refreshTokens = {}; // STORED IN DATA BASE

var SECRET_SIGN = 'SECRET-KEY';

var passportOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_SIGN
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.all(cors());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, , Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    next();
});


passport.use(new JwtStrategy(passportOpts, function (jwtPayload, done) {
    var expirationDate = new Date(jwtPayload.exp * 1000);
    if (expirationDate < new Date()) {
        return done(null, false);
    }
    done(null, jwtPayload);
}));

passport.serializeUser(function (user, done) {
    done(null, user.dni);
});
passport.deserializeUser(function (user, done) {
    done(null, user.dni);
});


var listaFormularios = [{
    id: 12992348,
    cod_trab: 1,
    nom_trab: "Garcia Garcia, Adriel",
    ape_trab: "grimaldina",
    cargo: "Practicante",
    nom_area: "Sistemas",
    dni_trab: "12345678",
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

var altas_bajas = express.Router();
var auth = express.Router();

altas_bajas.get('/', passport.authenticate('jwt', { session: true }), function (req, res) {
    res.json(listaFormularios);
});


auth.post('/login', function (req, res) {
    console.log(req.body);
    var { dni, pasw } = req.body;
    var found = listaFormularios.find(u => u.dni_trab === dni);
    if (found) {
        var index = listaFormularios.findIndex(u => u.dni_trab === dni);
        if (listaFormularios[index].pasw === pasw)
            sendToken(dni, res);
        else
            res.sendStatus(700);
    }
    else
        res.sendStatus(700);
});


auth.post('/logout', function (req, res) {
    var refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens) {
        delete refreshTokens[refreshToken]; //NORMALMENTE EN BASE DE DATOS
    }
    res.sendStatus(204);
});

auth.post('/refresh', function (req, res) {
    var refreshToken = req.body.refreshToken;
    console.log(refreshToken);
    console.log(refreshTokens[refreshToken]);

    if (refreshToken in refreshTokens) {
        var user = {
            dni: refreshTokens[refreshToken],
            role: 'admin'
        };
        var token = jwt.sign(user, SECRET_SIGN, { expiresIn: 600 });
        res.json({ tokenRefreshed: token });
    }
    else {
        res.sendStatus(401);
    }
});



function sendError(res) {
    res.json({ succes: false, dni: null, token: null, refreshToken: null });
}

function sendToken(dni, res) {
    var user = {
        dni: dni,
        role: 'admin'
    };
    var token = jwt.sign(user, SECRET_SIGN, { expiresIn: 600 });
    var refreshToken = randtoken.uid(256);
    refreshTokens[refreshToken] = dni;
    console.log(refreshTokens[refreshToken]);
    res.json({ succes: true, dni: dni, token: token, refreshToken: refreshToken });
}


app.use('/auth', auth);
app.use('/FormularioAccesos', altas_bajas);

app.listen(7651);

