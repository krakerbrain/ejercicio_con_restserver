//============================
// Puerto
//===========================

process.env.PORT = process.env.PORT || 3000;

//============================
// Entorno
//===========================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//============================
// Vencimiento del token
//===========================
//60 SEG
//60 MIN
//24 HORAS
//30 DIAS
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//============================
// SEED  de autenticación
//===========================

process.env.SEED = process.env.SEED || "secret";

//============================
// Base de datos
//===========================
let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB = process.env.MONGO_URL;
}

process.env.URLDB = urlDB;

//============================
// Google Client ID
//===========================

process.env.CLIENT_ID = process.env.CLIENT_ID || "980367779276-dc5nghk5gcv2cv7pb5os5k4ct5dgti0u.apps.googleusercontent.com";
