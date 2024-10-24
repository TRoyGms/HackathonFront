module.exports = (app) => {
    const detalle_pedidos = require("../controllers/Detalle_pedido.controller.js");
    const authMiddleware = require('../middleware/auth');
    const router = require("express").Router();
    const rateLimit = require("express-rate-limit")


    const apiLimiter = rateLimit({
      windowMs : 100 * 60 * 60 * 1000,
      max : 100,
      message: 'Limite de peticiones para esta ip' 
    })
  
    router.post("/", authMiddleware.verifyToken,apiLimiter,detalle_pedidos.create);
  
    router.get("/" , authMiddleware.verifyToken, apiLimiter,detalle_pedidos.findAll);
  
    router.get("/pedido/:id_pedido" , authMiddleware.verifyToken, apiLimiter,detalle_pedidos.findByPedidoId);
  
    router.put("/:id" , authMiddleware.verifyToken, apiLimiter,detalle_pedidos.update);
  
    router.delete("/:id" , authMiddleware.verifyToken, apiLimiter,detalle_pedidos.delete);
  
    router.delete("/" , authMiddleware.verifyToken, apiLimiter,detalle_pedidos.deleteAll);
  
    app.use("/api/detalle_pedidos", router);
  };
  