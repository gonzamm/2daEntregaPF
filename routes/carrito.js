const express = require('express')
const Daos = require("../src/daos/configDb");

const  router  = express.Router();


//CLASE CONTENEDORA DE CARRITO Y PRODUCTO
let carros = Daos.carritos
let productos = Daos.productos


//FUNCION FECHA
function darFecha() {
    const fecha = new Date();
    let fechaOK = fecha.getDate() + '/' + (fecha.getMonth()+1) + ' - ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
    return fechaOK;
  }

//POST VACIO CREA UN NUEVO CARRITO
router.post("/", (req, res) => {
    //Creo un nuevo carrito
    let carrito = {
        timestamp: darFecha(),
        productos:[]
    };

    //Agrego el carrito a carritos.txt
    async function saveCarrito(){
        try {
        let aux = await carros.save(carrito);
        res.send({id: aux.id});
        
        } catch (error) {
        throw Error("Error en post carrito");
        }
    }
    saveCarrito();
  });

//POST CON ID DE PTO
router.post("/:idCarrito/:idPto", (req, res) =>{
    async function agregarPtoXid(){
        try{
          //Busco el producto por ID  
          let ptoId = await productos.getById(req.params.idPto);
          //Me fijo si existe el pto con el ID solicitado
          if (Object.keys(ptoId).length != 0) {
            //Pto con ID solicitado encontrado
            //Busco el carrito con el id enviado por parametro
            let carrito = await carros.getById(req.params.idCarrito);
            //Me fijo si existe el carrito con id solicitado
            if (carrito){
                //Carrito encontrado agrego el producto
                carrito.productos.push(ptoId);
                carros.update(carrito);
                res.send({carrito});
            }
            //Carrito no encontrado envio error
            else{
                res.status(400);
                res.send({error : 'carrito no encontrado'})
            }
          } 
          //Pto no encontrado envio error   
          else{
              res.status(400);
              res.send({ error : 'producto no encontrado' });
          }
        }
        catch(error){
          throw Error("Error agregando pto al carrito");
        }
        
      };
      agregarPtoXid();

});

//DELETE CARRITO SEGUN ID
router.delete("/:id", (req,res) =>{
    async function deletexId(){
        try {
          //Me fijo si existe el carrito con el ID solicitado
          let flag = await carros.getById(req.params.id);
          if (Object.keys(flag).length != 0) {
            //Carritto con ID solicitado encontrado
            //Borro el carrito con el ID solicitado, y envio respuesta
            await carros.deleteById(req.params.id);
            res.send(await carros.getAll());   
          }
          //Carro con ID no encontrado, envio error
          else{
            res.status(400);
            res.send({ error : 'Carrito con ID solicitado no existe' });
          }
        } catch (error) {
          throw Error ("Error borrando carro por ID");
        }
      }

deletexId();

});

//DELETE DE UN PRODUCTO DE UN CARRITO SEGUN ID
router.delete("/:idCarrito/:idPto", (req,res) =>{
    async function deletePtoxid(){
        try{
          let carritoId = await carros.getById(req.params.idCarrito);
          //Me fijo si existe el carrito con el ID solicitado
          if (Object.keys(carritoId).length != 0) {
            //Carro con ID solicitado encontrado
            //Armo un array con los productos que tiene el carro
            let ptosCarro = carritoId.productos;
            //Busco el index del producto a eliminar
            let indexPto = ptosCarro.findIndex(aux => aux.id == req.params.idPto);
            if (indexPto>= 0){
                //Producoto en carrito encontrado borro el producto
                carritoId.productos.splice(indexPto, 1);
                carros.update(carritoId);
                res.send(carritoId);
            }
            //El ID de producto no esta en el carrito, envio error
            else{
            res.status(400);
            res.send({error: "Pto con ID solicitado no existe en el carrito"})
            }
 
          }
          //No existe el carrito con id solicitado envio error
          else{
            res.status(400);
            res.send({error: "Carrito con ID solicitado no existe"})
          }
        }
        catch(error){
            throw Error ("Error borrando producto de carro por ID");
        }

    }

    deletePtoxid();
});

//GET PRODUCTOS EN CARRITO POR ID
router.get("/:id", (req, res) =>{
    async function todosPtos(){
        try {
            //Busco el carrito con el id enviado por parametro
            let carrito = await carros.getById(req.params.id);
            if (carrito){
                ptos = carrito.productos;
                res.send(ptos);
            }
            //No existe el carrito con el id solicitado, envio error
            else{
                res.status(400);
                res.send({error: "Carrito con ID solicitado no existe"})
            }   
        }
        catch(error){
            throw Error ("Error obteniendo todos los producto del carrito por ID");
        }
    }
    
    todosPtos();

});

//GET TODOS LOS CARRITOS
router.get("/", (req,res)=>{

    async function carrito(){
        try{
            let aux = await carros.getAll();
            res.send(aux);
        }
        catch{
            console.log("ERROR");
        }
    }
    carrito();
})

//EXPORT MODULO ROUTER
module.exports = router;
