const ContenedorMongoDB = require ("../../contenedores/ContenedorMongoDb")

class CarritoDaoMongoDb extends ContenedorMongoDB {

    constructor() {
        super('carritos',{
            timestamp: {type: String, required: true},
            productos: {type: Array, required: true}
        })
    }
}

module.exports = CarritoDaoMongoDb
