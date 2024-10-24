const Detalle_pedido = require("../models/Detalle_pedido.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const detalle_pedido = new Detalle_pedido({
    Id_Pedido: req.body.Id_Pedido,
    Id_Producto: req.body.Id_Producto,
    Cantidad: req.body.Cantidad,
    Talla: req.body.Talla,
    Subtotal: req.body.Subtotal
  });

  Detalle_pedido.create(detalle_pedido, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Detalle_pedido.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Detalle_pedido.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving detalle_pedidos.",
      });
    else res.send(data);
  });
};

exports.findByPedidoId = (req, res) => {
  Detalle_pedido.findByPedidoId(req.params.id_pedido, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Detalle_pedido with Id_Pedido ${req.params.id_pedido}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Detalle_pedido with Id_Pedido " + req.params.id_pedido,
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

  Detalle_pedido.updateById(req.params.id, new Detalle_pedido(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Detalle_pedido with Id_Detalle ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Detalle_pedido with Id_Detalle " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Detalle_pedido.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Detalle_pedido with Id_Detalle ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Detalle_pedido with Id_Detalle " + req.params.id,
        });
      }
    } else res.send({ message: `Detalle_pedido was deleted successfully!` });
  });
};

// Delete all Detalle_pedidos from the database.
exports.deleteAll = (req, res) => {
  Detalle_pedido.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all detalle_pedidos.",
      });
    else res.send({ message: `All Detalle_pedidos were deleted successfully!` });
  });
};
