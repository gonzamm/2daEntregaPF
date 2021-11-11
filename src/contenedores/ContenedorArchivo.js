const fs = require('fs');

class ContenedorArchivo {

    constructor(name) {
        this.name = name;
    }

     async read() {
        try {
            let data2 = fs.readFileSync(this.name, 'utf8');
            return data2;
                 
        } catch (error) {
            throw Error("Error al leer el archivo");
        }
    }

    async write(datos, msg) {
        try {
            await fs.promises.writeFile(this.name, JSON.stringify(datos, null, 2));
            console.log(msg);
        } catch (error) {
            throw Error("Error al escribir en el archivo");
        }
    }


    async save(product) {
        try{
            let newId = 1;
            let newProduct = null;
    
            let data = await this.read();
            let datos = JSON.parse(data);
            if (data === '[]'){
                product.id = newId ;
                newProduct = [product];
                await this.write(newProduct, "Se agrego el primer producto");
            } else {
                product.id = parseInt(datos[datos.length - 1].id) + 1;
                product.id = `${product.id}`
                newProduct = product;
                datos.push(newProduct);
                await this.write(datos, "Producto agregado correctamente");
            }
        }
        catch(error){
            throw Error("Error en el save");
        }

    }


    async getById(num) {
        try{
            let data = await this.read();
            let datos = await JSON.parse(data);
            let result = await datos.filter( product => product.id == num);
            if (result != []){
                return await result[0]
            }else{
                return false;
            }

        }
        catch(error){
            throw Error("Error en getById");
        }

    }

    async getAll() {
         try{
            let data = await this.read();
            let datos = JSON.parse(data);
    
            return datos;
        }
        catch(error){
            console.log(error)
        };

    }

    async deleteById(num) {
        try{
            let data = await this.read();
            let datos = JSON.parse(data);
    
            let product = datos.find( product => product.id == num);
            
            if(product) {
                let index = datos.indexOf(product);
                datos.splice(index, 1);
                await this.write(datos, `Producto con ID: ${num} eliminado correctamente`);
            } else {
                console.log(`Producto con ID: ${num} no existe`);
                return [];
            }
        }
        catch(error){
            throw Error("Error en el deleteById");
        }

    }

    async deleteAll() {
        try{
            let data = [];
            await this.write(data, "Todos los productos eliminados");
        }
        catch(error){
            throw Error("Error en el deleteAll()");
        }
    }

    async update(item) {
        let ptoMod = await this.getById(item.id);
        if (Object.keys(ptoMod).length != 0) {
            //Pto con ID encontrado
            //Armado de un array con todos los PTOS
            let todosPtos = await this.read();
            todosPtos = (JSON.parse(todosPtos, null, 2));
            //Modifico el array con el PTO modificado
            let auxId = item.id - 1;
            todosPtos.splice(auxId, 1, item);
            //Escribo el archivo
            await this.write(todosPtos, "Producto modificado correctamente");
            //Envio respuesta
            return todosPtos;
        }
    }
    
    
}

module.exports = ContenedorArchivo;
