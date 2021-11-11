const ContenedorArchivo = require ("../../contenedores/ContenedorArchivo")

class ProductoDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('./DB/productos.txt')
    }
}

module.exports = ProductoDaoArchivo