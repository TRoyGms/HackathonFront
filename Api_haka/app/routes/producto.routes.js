module.exports = (app) => {
  const productos = require("../controllers/producto.controller.js");
  const router = require("express").Router();
  const authMiddleware = require('../middleware/auth');
  const rateLimit = require("express-rate-limit")


  const apiLimiter = rateLimit({
    windowMs : 100 * 60 * 1000,
    max : 50,
    message: 'Limite de peticiones para esta ip' 
  })

  router.post("/",/*authMiddleware.verifyToken,*/apiLimiter,productos.create);

  router.get("/", productos.findAll);

  router.get("/:id", productos.findOne);

  router.get("/buscar/:nombre", apiLimiter,productos.findByNombre);

  router.put("/:id",authMiddleware.verifyToken,apiLimiter,productos.update);

  router.delete("/:id",authMiddleware.verifyToken,apiLimiter,productos.delete);

  router.delete("/",authMiddleware.verifyToken,apiLimiter,productos.deleteAll);

  app.use("/api/productos", router);
};
