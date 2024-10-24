const Wishlist = require("../models/Wishlist.model.js");

// Crear y guardar una nueva Wishlist
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
    return;
  }

  // Crear una nueva Wishlist
  const wishlist = new Wishlist({
    Cantidad: req.body.Cantidad,
    Talla: req.body.Talla,
    Subtotal: req.body.Subtotal,
    Id_Producto: req.body.Id_Producto,
    Id_Cliente: req.body.Id_Cliente
  });

  // Guardar la Wishlist en la base de datos
  Wishlist.create(wishlist, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear la Wishlist."
      });
    else res.send(data);
  });
};

// Obtener todos los items de la Wishlist de un cliente específico
exports.findByClienteId = (req, res) => {
  Wishlist.findByClienteId(req.params.id_cliente, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar la Wishlist."
      });
    else res.send(data);
  });
};

// Actualizar cantidad y talla de un item de la Wishlist específico
exports.updateById = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío"
    });
    return;
  }

  Wishlist.updateById(
    req.params.id,
    req.body.Cantidad,
    req.body.Talla,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró Wishlist con id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error actualizando Wishlist con id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar un item de la Wishlist por id
exports.delete = (req, res) => {
  Wishlist.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró Wishlist con id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar Wishlist con id " + req.params.id
        });
      }
    } else res.send({ message: `Wishlist fue eliminada exitosamente!` });
  });
};

// Eliminar todos los items de la Wishlist de un cliente
exports.deleteAllByClienteId = (req, res) => {
  Wishlist.removeAllByClienteId(req.params.id_cliente, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar la Wishlist."
      });
    else res.send({ message: `Todas las Wishlist del cliente fueron eliminadas exitosamente!` });
  });
};
