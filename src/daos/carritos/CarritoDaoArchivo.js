const ContenedorArchivo = require ("../../contenedores/ContenedorArchivo")

class CarritoDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('./DB/carritos.txt')
    }
}

module.exports = CarritoDaoArchivo