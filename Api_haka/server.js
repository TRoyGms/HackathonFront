const express = require("express");
const cors = require("cors");
const https = require('https');
const fs = require('fs');
const app = express();
const path = require("path");

const corsOptions = {
origin: '*', // Permitir solicitudes
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
credentials: true, // Permitir el envío de credenciales
optionsSuccessStatus: 204 // Estado para opciones exitosas
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


require("./app/routes/Cliente.routes.js")(app);
require("./app/routes/producto.routes.js")(app);
require("./app/routes/Pedido.routes.js")(app);
require("./app/routes/Detalle_pedido.routes.js")(app);
require("./app/routes/Wishlist.routes.js")(app);

app.use("/uploads",express.static('uploads'));

// set port, listen for requests
const options = {
key: fs.readFileSync('privkey.pem'),
cert: fs.readFileSync('fullchain.pem')
};
app.get('/', (req, res) => {
res.send('Hola, mundo!');
});
const PORT = process.env.PORT
https.createServer(options, app).listen(PORT, () => {
console.log(`Servidor HTTPS corriendo en el puerto ${PORT}`);
});
