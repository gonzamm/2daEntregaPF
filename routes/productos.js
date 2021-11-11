const express = require("express");
const Daos = require("../src/daos/configDb");


const router = express.Router()


let productos = Daos.productos;

//FECHA
function darFecha() {
  const fecha = new Date();
  let fechaOK = fecha.getDate() + '/' + (fecha.getMonth()+1) + ' - ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
  return fechaOK;
}
//GET TODOS LOS PRODUCTOS
router.get("/", (req, res) => {
  async function getTodos(){
    try{
      let aux = await productos.getAll();
      res.send(aux);
    }
    catch(error){
      throw Error("Error en todos los productos")
    }  
  }    
  getTodos();
});

//GET PRODUCTO POR ID
router.get("/:id", (req, res) =>{
  async function getxId(){
    try{
      let ptoId = await productos.getById(req.params.id);
      //Me fijo si existe el PTO con el ID solicitado
      if (ptoId === undefined || Object.keys(ptoId).length == 0 ){
        //Pto con ID solicitado NO encontrado, envio error
        res.status(400);
        res.send({ error : 'producto no encontrado' });
      }else{
        //Pto con ID solicitado encontrado, envio respuesta
        res.send(ptoId)
      }
    }
    catch(error){
      throw Error("Error buscando producto por id");
    }
    
  };
  getxId();
});

//POST CON PTO NUEVO ENVIADO POR PARAMETRO
router.post("/", (req, res) => {
  //Armo un nuevo PTO con los datos recibidos por parametro y datos locales como fecha
  let { nombre, descripcion, codigo, thumbail, precio, stock } = req.body;
  let newObj = {
    timestamp: darFecha(),
    nombre,
    descripcion,
    codigo,
    thumbail,
    precio,
    stock
  };

  //Agrego el producto
  async function savePto(){
    try {
      await productos.save(newObj);
      res.send(newObj);
      
    } catch (error) {
      throw Error("Error en post productos");
    }
  }

  //Variable admin a ser configurada mas adelante, por ahora enviada por query
  //Me fijo si es administrador o no
  if (req.query.admin == 'true') {
    savePto();
  }
  else{
    res.status(403);
    res.send({error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada`});
  }
});

//PUT MODIFICANDO SEGUN ID
router.put("/:id", (req, res) =>{
  //Armo un nuevo PTO con los datos recibidos por parametro
  let { nombre, descripcion, codigo, thumbail, precio, stock} = req.body;
  let ptoMod = {
    id : req.params.id,
    timestamp: darFecha(),
    nombre,
    descripcion,
    codigo,
    thumbail,
    precio,
    stock
  };

  async function modfPto(){
    try {
      //Me fijo si existe el PTO con el ID solicitado
      let flag = await productos.getById(req.params.id);
      if (flag === undefined || Object.keys(flag).length == 0 ){
        //Pto con ID solicitado NO encontrado, envio error
        res.status(400);
        res.send({ error : 'producto no encontrado' });
      }
      else{
        //Pto con ID solicitado encontrado
        //Borro el PTO con el ID solicitado, y envio respuesta
        await productos.update(ptoMod)
        res.send(ptoMod)  
      }
    } catch (error) {
      throw Error("Error en put modificacion productos");
    }
  }

  //Variable admin a ser configurada mas adelante, por ahora enviada por query
  //Me fijo si es administrador o no
  if (req.query.admin == 'true') {
    modfPto();
  }
  else{
    res.status(403);
    res.send({error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada`});
  }
});

//DELETE SEGUN ID
router.delete("/:id", (req,res) =>{
  async function deletexId(){
    try {
      //Me fijo si existe el PTO con el ID solicitado

      let flag = await productos.getById(req.params.id);
      if (flag === undefined || Object.keys(flag).length == 0 ){
        //PTO con ID no encontrado, envio error
        res.status(400);
        res.send({ error : 'producto no encontrado' });
      }
      else{
        //Pto con ID solicitado encontrado
        //Borro el PTO con el ID solicitado, y envio respuesta
        await productos.deleteById(req.params.id);
        res.send(await productos.getAll()); 
      }
    } catch (error) {
      throw Error ("Error en el delete por id");
    }
  }

  //Variable admin a ser configurada mas adelante, por ahora enviada por query
  //Me fijo si es administrador o no
  if (req.query.admin == 'true') {
     deletexId();
  }
  else{
    res.status(403);
    res.send({error: -1, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada`});
  }
});

//EXPORT MODULO ROUTER
module.exports = router;
