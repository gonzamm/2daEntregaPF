const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

//MIDLEWARES
app.use(express.static(__dirname + '/public'));
app.use(express.json()); // body-parser
app.use(express.urlencoded());

  //ROUTES
const produtosRoute = require("./routes/productos");
app.use("/api/productos", produtosRoute);
const carritoRoute = require("./routes/carrito");
app.use("/api/carrito", carritoRoute);

  //MANEJO DE ERROR 404
app.use((req, res, next) => {
  res.status(404);
  res.send({error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`});
});

//COMIENZO SERVIDOR
const server = app.listen(PORT, () => {
    console.log(`Server is run on port ${server.address().port}`)
  })
  server.on('error', error => console.log(`Error en servidor ${error}`))
