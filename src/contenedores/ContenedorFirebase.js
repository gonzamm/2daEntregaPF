let admin = require('firebase-admin')
const config = require('./config')
const { v4:uuid4 } = require("uuid")

admin.initializeApp({
    credential: admin.credential.cert(config.firebase),
    databaseURL: "http://ecommerce-70a05.firebaseio.com"
});

const db = admin.firestore()
  
class ContenedorFirebase {

    constructor(name) {
        this.coleccion = db.collection(name)
    }

    async save(nuevoElem) {
        try{
            let doc = this.coleccion.doc(`${uuid4()}`)
            await doc.create(nuevoElem);
            return { ...nuevoElem, id: doc.id }
        }
        catch(error){
            throw Error("Error en el save");
        }

    }


    async getById(num) {
        try{
            let doc = await this.coleccion.doc(num);
            let item = (await doc.get()).data()
            //Si existe el item lo envio, sino retorno falso
            if(item){
                item.id = num
                return item
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
            const result = []
            const data = await this.coleccion.get();
            data.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        }
        catch(error){
            console.log(error)
        };

    }

    async deleteById(num) {
        try{
            const item = await this.coleccion.doc(num).delete();
            return item
        }
        catch(error){
            throw Error("Error en el deleteById");
        }

    }

    async deleteAll() {
        try{
            const docs = await this.getAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.deleteById(id))
            return {msg: "Todos los usuarios borrados"}
        }
        catch(error){
            throw Error("Error en el deleteAll()");
        }
    }

    async update(nuevoElem) {
        try {
            const actualizado = await this.coleccion.doc(nuevoElem.id).set(nuevoElem);
            return actualizado
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }
    
    
}

/* const user = new ContenedorFirebase("users");
const main = async()=>{
    let aux = await user.getById("2")
    console.log(aux);
    let actualizacion = { age: 26, name: '2'}
    let hola = await user.save(actualizacion)
    console.log(hola);
    user.deleteAll();
    console.log("TODO OK");
}

main() */


module.exports = ContenedorFirebase;
