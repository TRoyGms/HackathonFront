const sql = require("../config/db.js");

// constructor
const Detalle_pedido = function (detalle_pedido) {
  this.Id_Pedido = detalle_pedido.Id_Pedido;
  this.Id_Producto = detalle_pedido.Id_Producto;
  this.Cantidad = detalle_pedido.Cantidad;
  this.Talla = detalle_pedido.Talla;
  this.Subtotal = detalle_pedido.Subtotal;
};

Detalle_pedido.create = (newDetalle_pedido, result) => {
  sql.query(
    "INSERT INTO Detalle_pedido SET ?",
    newDetalle_pedido,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created detalle_pedido: ", {
        id: res.insertId,
        ...newDetalle_pedido,
      });
      result(null, { id: res.insertId, ...newDetalle_pedido });
    }
  );
};

Detalle_pedido.findByPedidoId = (id_pedido, result) => {
  sql.query(
    `SELECT * FROM Detalle_pedido WHERE Id_Pedido = ${id_pedido}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found detalles for pedido: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Detalle_pedido.getAll = (result) => {
  sql.query(
    `select 
      Detalle_pedido.Id_Detalle,
      Detalle_pedido.Id_Pedido,
      Detalle_pedido.Cantidad,
      Detalle_pedido.Talla,
      Detalle_pedido.Subtotal,
      Detalle_pedido.Id_Producto,
      Producto.Nombre_modelo,
      Producto.Precio,
      Producto.Imagen
      from Detalle_pedido
      inner join Producto on Detalle_pedido.Id_Producto = Producto.Folio_producto`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("detalle_pedidos: ", res);
      result(null, res);
    }
  );
};

Detalle_pedido.updateById = (id, detalle_pedido, result) => {
  sql.query(
    "UPDATE Detalle_pedido SET Cantidad = ?, Talla = ?, WHERE Id_Detalle = ?",
    [detalle_pedido.Cantidad, detalle_pedido.Talla, id],
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

      console.log("updated detalle_pedido: ", { id: id, ...detalle_pedido });
      result(null, { id: id, ...detalle_pedido });
    }
  );
};

Detalle_pedido.remove = (id, result) => {
  sql.query(
    "DELETE FROM Detalle_pedido WHERE Id_Detalle = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Detalle_pedido with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted detalle_pedido with Id_Detalle: ", id);
      result(null, res);
    }
  );
};

Detalle_pedido.removeAll = (result) => {
  sql.query("DELETE FROM Detalle_pedido", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} detalle_pedidos`);
    result(null, res);
  });
};

module.exports = Detalle_pedido;
