module.exports = (app) => {
  const clientes = require("../controllers/Cliente.controller.js");
  const authMiddleware = require('../middleware/auth');
  const router = require("express").Router();
  const rateLimit = require("express-rate-limit")


  const apiLimiter = rateLimit({
    windowMs : 500 * 60 * 1000,
    max : 5,
    message: 'Limite de peticiones para esta ip' 
  })

  router.post("/register", clientes.register);

  router.post("/login" , apiLimiter,clientes.login)

  router.get("/", /*authMiddleware.verifyToken,apiLimiter,*/clientes.findAll);

  router.get("/:id", authMiddleware.verifyToken,apiLimiter,clientes.findOne);

  router.put("/:id", authMiddleware.verifyToken,apiLimiter,clientes.update);

  router.delete("/:id", authMiddleware.verifyToken,apiLimiter,clientes.delete);

  router.delete("/", authMiddleware.verifyToken,apiLimiter,clientes.deleteAll);

  app.use("/api/clientes",router);
};
