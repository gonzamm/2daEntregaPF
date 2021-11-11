const { Mongoose } = require("mongoose");
const ContenedorMongoDB = require ("../../contenedores/ContenedorMongoDb")

class ProductosDaoMongoDb extends ContenedorMongoDB {

    constructor() {
        super('productos',{
            timestamp: {type: String, required: true},
            nombre: {type: String, required: true},
            descripcion: {type: String, required: true},
            codigo: {type: Number, required: true},
            thumbail: {type: String, required: true},
            precio: {type: Number, required: true},
            stock: {type: Number, required: true}
        })
    }
}

module.exports = ProductosDaoMongoDb