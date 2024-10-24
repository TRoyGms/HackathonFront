const sql = require("../config/db.js");

// constructor
const Pedido = function (pedido) {
  this.Fecha = pedido.Fecha;
  this.Id_Cliente = pedido.Id_Cliente;
  this.Total = pedido.Total;
  this.Estatus = pedido.Estatus;
};

Pedido.create = (newPedido, result) => {
  sql.query("INSERT INTO Pedido SET ?", newPedido, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pedido: ", { id: res.insertId, ...newPedido });
    result(null, { id: res.insertId, ...newPedido });
  });
};

Pedido.findById = (id, result) => {
  sql.query(`SELECT * FROM Pedido WHERE Id_Pedido = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pedido: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Pedido.getAll = (result) => {
  sql.query(
    `select
    Pedido.Id_Pedido,
    Pedido.Fecha,
    Pedido.Id_Cliente,
    Pedido.Total,
    Pedido.Estatus,
    Cliente.Nombres,
    Cliente.Apellidos,
    Cliente.Telefono
    from Pedido 
    inner join Cliente on Pedido.Id_Cliente = Cliente.Id_Cliente`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("pedidos: ", res);
      result(null, res);
    }
  );
};

Pedido.getEstatus = (result) => {
  sql.query(`select * 
            from Pedido 
            where Estatus 
            in ("Entrega inmediata","Entrega en 15 dias")`,
  (err,res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pedidos: ", res);
    result(null, res);
  })
}
Pedido.updateById = (id, pedido, result) => {
  sql.query(
    "UPDATE Pedido SET Estatus = ? WHERE Id_Pedido = ?",
    [pedido.Estatus, id],
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

      console.log("updated pedido: ", { id: id, ...pedido });
      result(null, { id: id, ...pedido });
    }
  );
};

Pedido.remove = (id, result) => {
  sql.query("DELETE FROM Pedido WHERE Id_Pedido = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Pedido with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pedido with id: ", id);
    result(null, res);
  });
};

Pedido.removeAll = (result) => {
  sql.query("DELETE FROM Pedido", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} pedidos`);
    result(null, res);
  });
};

module.exports = Pedido;
