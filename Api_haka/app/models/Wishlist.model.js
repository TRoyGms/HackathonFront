const sql = require("../config/db");

// Constructor
const Wishlist = function (wishlist) {
  this.Cantidad = wishlist.Cantidad;
  this.Talla = wishlist.Talla;
  this.Subtotal = wishlist.Subtotal;
  this.Id_Producto = wishlist.Id_Producto;
  this.Id_Cliente = wishlist.Id_Cliente;
};

// Crear nueva wishlist
Wishlist.create = (newWishlist, result) => {
  sql.query("INSERT INTO Wishlist SET ?", newWishlist, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newWishlist });
  });
};

// Obtener todos los items de la wishlist de un cliente específico
Wishlist.findByClienteId = (clienteId, result) => {
  const query = ` SELECT 
      Wishlist.*, 
      Producto.Imagen, 
      Producto.Nombre_modelo, 
      Producto.Precio
    FROM 
      Wishlist 
    JOIN 
      Producto 
    ON 
      Wishlist.Id_Producto = Producto.Folio_producto 
    WHERE 
      Wishlist.Id_Cliente = ?`;
  sql.query(query, [clienteId], (err, res) => {
    if (err) {
      console.log("error", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Actualizar cantidad y talla de un item de la wishlist específico
Wishlist.updateById = (id, cantidad, talla, result) => {
  sql.query(
    "UPDATE Wishlist SET Cantidad = ?, Talla = ? WHERE Id_Wish = ?",
    [cantidad, talla, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, cantidad: cantidad, talla: talla });
    }
  );
};

// Eliminar un item de la wishlist por id
Wishlist.remove = (id, result) => {
  sql.query("DELETE FROM Wishlist WHERE Id_Wish = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

// Eliminar todos los items de la wishlist de un cliente
Wishlist.removeAllByClienteId = (clienteId, result) => {
  sql.query(
    "DELETE FROM Wishlist WHERE Id_Cliente = ?",
    clienteId,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Wishlist;
