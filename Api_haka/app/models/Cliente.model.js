const sql = require("../config/db.js");

// constructor
const Cliente = function (cliente) {
  this.Nombres = cliente.Nombres;
  this.Apellidos = cliente.Apellidos;
  this.Telefono = cliente.Telefono;
  this.Email = cliente.Email;
  this.Id_Rol = cliente.Id_Rol;
  this.Contraseña = cliente.Contraseña; // Nuevo atributo
};

Cliente.findById = (id, result) => {
  sql.query(`SELECT * FROM Cliente WHERE Id_Cliente = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cliente: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Cliente.getAll = (nombre, result) => {
  let query = "SELECT * FROM Cliente";

  if (nombre) {
    query += ` WHERE Nombres LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("clientes: ", res);
    result(null, res);
  });
};

Cliente.updateById = (id, cliente, result) => {
  sql.query(
    "UPDATE Cliente SET Nombres = ?, Apellidos = ?, Telefono = ?, Email = ?, Id_Rol = ? WHERE Id_Cliente = ?",
    [
      cliente.Nombres,
      cliente.Apellidos,
      cliente.Telefono,
      cliente.Email,
      cliente.Id_Rol,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cliente: ", { id: id, ...cliente });
      result(null, { id: id, ...cliente });
    }
  );
};

Cliente.remove = (id, result) => {
  sql.query("DELETE FROM Cliente WHERE Id_Cliente = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Cliente with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cliente with id: ", id);
    result(null, res);
  });
};

Cliente.removeAll = (result) => {
  sql.query("DELETE FROM Cliente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} clientes`);
    result(null, res);
  });
};

module.exports = Cliente;
