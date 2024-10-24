module.exports = (app) => {
    const wishlist = require("../controllers/Wishlist.controller.js");
    const authMiddleware = require('../middleware/auth');
    const router = require("express").Router();
    const rateLimit = require("express-rate-limit");
  
    const apiLimiter = rateLimit({
      windowMs: 100 * 60 * 1000,
      max: 50,
      message: 'Limite de peticiones para esta ip'
    });
  
    // Crear nueva wishlist
    router.post("/", /*authMiddleware.verifyToken,*/ apiLimiter, wishlist.create);
  
    // Obtener todos los items de la wishlist de un cliente específico
    router.get("/cliente/:id_cliente", authMiddleware.verifyToken, apiLimiter, wishlist.findByClienteId);
  
    // Actualizar cantidad y talla de un item de la wishlist específico
    router.put("/:id", authMiddleware.verifyToken, apiLimiter, wishlist.updateById);
  
    // Eliminar un item de la wishlist por id
    router.delete("/:id", authMiddleware.verifyToken, apiLimiter, wishlist.delete);
  
    // Eliminar todos los items de la wishlist de un cliente
    router.delete("/cliente/:id_cliente", authMiddleware.verifyToken, apiLimiter, wishlist.deleteAllByClienteId);
  
    app.use("/api/wishlist", router);
  };
  