const Cliente = require("../models/Cliente.model.js");
const db = require("../config/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.register = (req, res) => {
  const { Nombres,Apellidos,Telefono,Email, Id_Rol,Contraseña } = req.body;
  const hashedPassword = bcrypt.hashSync(Contraseña, 8);

  const query = 'INSERT INTO Cliente (Nombres,Apellidos,Telefono,Email,Id_Rol,Contraseña) VALUES (?,?,?,?,?,?)'
  db.query(query, [Nombres,Apellidos,Telefono,Email,Id_Rol,hashedPassword], (err,result) => {
    if(err) return res.status(500).send(err)
    res.status(201).send({id: result.insertId, Email})
  })
};

exports.login = (req,res) => {
  const {Email,Contraseña} = req.body

  const query = 'SELECT * FROM Cliente WHERE Email = ?'
  db.query(query, [Email], (err,results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'Usuario no encontrado' });

    const user = results[0]
    const passwordIsValid = bcrypt.compareSync(Contraseña,user.Contraseña)
    if(!passwordIsValid) return res.status(401).send({ token: null, message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 })
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    res.setHeader("Authorization", "Bearer " + token);
    res.status(200).send({id: user.Id_Cliente, username: user.Email , rol: user.Id_Rol})
  })
}

exports.findAll = (req, res) => {
  const nombre = req.query.nombre;

  Cliente.getAll(nombre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clientes.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Cliente.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cliente with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cliente with id " + req.params.id,
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

  Cliente.updateById(req.params.id, new Cliente(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cliente with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Cliente with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Cliente.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cliente with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Cliente with id " + req.params.id,
        });
      }
    } else res.send({ message: `Cliente was deleted successfully!` });
  });
};

// Delete all Clientes from the database.
exports.deleteAll = (req, res) => {
  Cliente.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all clientes.",
      });
    else res.send({ message: `All Clientes were deleted successfully!` });
  });
};
