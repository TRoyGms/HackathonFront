const Producto = require("../models/producto.model.js");
const multer = require("multer");
const path = require("path");

// Configuración de multer para almacenar archivos en 'uploads/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.create = (req, res) => {
  upload.single('imagen')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      console.log("Multer Error:", err);
      return res.status(500).send({
        message: "Error al subir la imagen.",
        error: err
      });
    } else if (err) {
      // An unknown error occurred
      console.log("Unknown Error:", err);
      return res.status(500).send({
        message: "Error al subir la imagen.",
        error: err
      });
    }

    // Create a new Producto object with the uploaded image path
    const producto = new Producto({
      Folio_producto: req.body.Folio_producto,
      Nombre_modelo: req.body.Nombre_modelo,
      Descripcion: req.body.Descripcion,
      Precio: req.body.Precio,
      Categoria: req.body.Categoria,
      Marca: req.body.Marca,
      Color: req.body.Color,
      Genero: req.body.Genero,
      Imagen: req.file ? req.file.path : null // Ruta de la imagen
    });

    // Save Producto to database
    Producto.create(producto, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Producto.",
          error: err
        });
      else res.send(data);
    });
  });
};


exports.findAll = (req, res) => {
  const nombre = req.query.Nombre_modelo;

  Producto.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving productos.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Producto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Producto with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Producto with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.findByNombre = (req, res) => {
  const nombre = req.params.nombre;

  Producto.findByNombre(nombre, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró ningún producto con el nombre ${nombre}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Producto with nombre " + nombre,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Producto.updateById(req.params.id, new Producto(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Producto with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Producto with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Producto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Producto with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Producto with id " + req.params.id,
        });
      }
    } else res.send({ message: `Producto was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Producto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all productos.",
      });
    else res.send({ message: `All Productos were deleted successfully!` });
  });
};
