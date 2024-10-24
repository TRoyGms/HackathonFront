const Pedido = require("../models/Pedido.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const pedido = new Pedido({
    Fecha: req.body.Fecha,
    Id_Cliente: req.body.Id_Cliente,
    Total: req.body.Total,
    Estatus : req.body.Estatus
  });

  Pedido.create(pedido, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pedido.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Pedido.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pedidos.",
      });
    else res.send(data);
  });
};

exports.getEstatus = (req,res) => {
  Pedido.getEstatus((err,data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pedidos.",
      });
    else res.send(data);
  })
}

exports.findOne = (req, res) => {
  Pedido.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pedido with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Pedido with id " + req.params.id,
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

  Pedido.updateById(req.params.id, new Pedido(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pedido with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Pedido with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Pedido.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pedido with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Pedido with id " + req.params.id,
        });
      }
    } else res.send({ message: `Pedido was deleted successfully!` });
  });
};

// Delete all Pedidos from the database.
exports.deleteAll = (req, res) => {
  Pedido.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all pedidos.",
      });
    else res.send({ message: `All Pedidos were deleted successfully!` });
  });
};
