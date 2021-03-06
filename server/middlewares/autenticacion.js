const jwt = require("jsonwebtoken");

//============================
// Verificar Token
//===========================

let verificaToken = (req, res, next) => {
  let token = req.get("token");
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "token no válido",
        },
      });
    }

    req.usuario = decoded.usuario;
    next();
  });
};

//============================
// Verificar Token Imagen
//===========================

let verificaTokenImg = (req, res, next) => {
  let token = req.query.token;
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "token no válido",
        },
      });
    }

    req.usuario = decoded.usuario;
    next();
  });
};

//============================
// Verificar Admin
//===========================

let verificaAdmin = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.role === "ADMIN_ROLE") {
    next();
  } else {
    return res.json({
      ok: false,
      err: {
        message: "El usuario no es administrador",
      },
    });
  }
};
module.exports = {
  verificaToken,
  verificaAdmin,
  verificaTokenImg,
};
