module.exports = (app) => {
    const pedidos = require("../controllers/Pedido.controller.js");
    const authMiddleware = require('../middleware/auth');
    const router = require("express").Router();
    const rateLimit = require("express-rate-limit")


    const apiLimiter = rateLimit({
      windowMs : 100 * 60 * 1000,
      max : 10,
      message: 'Limite de peticiones para esta ip' 
    })
  
    router.post("/", authMiddleware.verifyToken,apiLimiter,pedidos.create);
  
    router.get("/", authMiddleware.verifyToken,apiLimiter,pedidos.findAll);
  
    router.get("/:id", authMiddleware.verifyToken,apiLimiter,pedidos.findOne);

    router.get("/estatus/entrega/",authMiddleware.verifyToken,apiLimiter,pedidos.getEstatus)
  
    router.put("/:id", authMiddleware.verifyToken,apiLimiter,pedidos.update);
  
    router.delete("/:id", authMiddleware.verifyToken,apiLimiter,pedidos.delete);
  
    router.delete("/", authMiddleware.verifyToken,apiLimiter,pedidos.deleteAll);
  
    app.use("/api/pedidos", router);
  };
  