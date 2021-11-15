const express = require("express");

let { verificaToken } = require("../middlewares/autenticacion");
let app = express();
let Producto = require("../models/producto");

//=========================
//Obtener producto
//=========================
app.get("/productos", verificaToken, (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  Producto.find({ disponible: true })
    .skip(desde)
    .limit(5)
    .populate("usuario", "nombre email")
    .populate("categoria")
    .exec((err, productos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        productos,
      });
    });
});

//=========================
//Obtener producto por id
//=========================
app.get("/productos/:id", (req, res) => {
  let id = req.params.id;

  Producto.findById(id)
    .populate("usuario", "nombre email")
    .populate("categoria", "descripcion")
    .exec((err, productoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!productoDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "ID no existe",
          },
        });
      }
      res.json({
        ok: true,
        productos: productoDB,
      });
    });
});

//=========================
//Buscar un producto
//=========================

app.get("/productos/buscar/:termino", verificaToken, (req, res) => {
  let termino = req.params.termino;
  let regex = new RegExp(termino, "i");

  Producto.find({ nombre: regex })
    .populate("categoria", "descripcion")
    .exec((err, productos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!productos) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        producto: productos,
      });
    });
});

//=========================
//Agregar un producto
//=========================
app.post("/productos/", verificaToken, (req, res) => {
  let body = req.body;

  let producto = new Producto({
    usuario: req.usuario._id,
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria,
  });

  producto.save((err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      producto: productoDB,
    });
  });
});

//=========================
//Actualizar Producto
//=========================
app.put("/productos/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let body = req.body;

  let descProducto = {
    nombre: body.nombre,
    categoria: body.categoria,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
  };

  Producto.findByIdAndUpdate(id, descProducto, { new: true, runValidators: true }, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "El id no existe",
        },
      });
    }
    res.json({
      ok: true,
      producto: productoDB,
    });
  });
});

//=========================
//Borrar Producto
//=========================
app.delete("/productos/:id", verificaToken, (req, res) => {
  let id = req.params.id;

  Producto.findById(id, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "ID no existe",
        },
      });
    }

    productoDB.disponible = false;

    productoDB.save((err, productoBorrado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        productoBorrado,
        mensaje: "Producto Borrado",
      });
    });
  });
});

module.exports = app;
