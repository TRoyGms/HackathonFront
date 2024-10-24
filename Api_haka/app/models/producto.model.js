const sql = require("../config/db.js");

// constructor
const Producto = function (producto) {
  this.Folio_producto = producto.Folio_producto;
  this.Nombre_modelo = producto.Nombre_modelo;
  this.Descripcion = producto.Descripcion;
  this.Precio = producto.Precio;
  this.Categoria = producto.Categoria;
  this.Marca = producto.Marca;
  this.Color = producto.Color;
  this.Genero = producto.Genero;
  this.Imagen = producto.Imagen;
};

Producto.create = (newProducto, result) => {
  sql.query("INSERT INTO Producto SET ?", newProducto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created producto: ", { id: res.insertId, ...newProducto });
    result(null, { id: res.insertId, ...newProducto });
  });
};

Producto.findById = (id, result) => {
  sql.query(
    `SELECT * FROM Producto WHERE Folio_producto = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found producto: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Producto with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Producto.findByNombre = (nombre, result) => {
  sql.query(
    `SELECT * FROM Producto WHERE Nombre_modelo LIKE '%${nombre}%'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found productos: ", res);
        result(null, res);
        return;
      }

      // not found Producto with the name
      result({ kind: "not_found" }, null);
    }
  );
};

Producto.getAll = (nombre, result) => {
  let query = "SELECT * FROM Producto";

  if (nombre) {
    query += ` WHERE Nombre_modelo LIKE '%${nombre}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("productos: ", res);
    result(null, res);
  });
};

Producto.updateById = (id, producto, result) => {
  sql.query(
    "UPDATE Producto SET Precio = ? WHERE Folio_producto = ?",
    [producto.Precio, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Producto with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated producto: ", { id: id, ...producto });
      result(null, { id: id, ...producto });
    }
  );
};

Producto.remove = (id, result) => {
  sql.query("DELETE FROM Producto WHERE Folio_producto = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Producto with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted producto with id: ", id);
    result(null, res);
  });
};

Producto.removeAll = (result) => {
  sql.query("DELETE FROM Producto", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} productos`);
    result(null, res);
  });
};

module.exports = Producto;
