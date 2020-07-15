
//Importamos Apollo Server
const { ApolloServer} = require('apollo-server');
//Importamos los modelos
const Usuario = require('../models/usuarios');
const Producto = require('../models/Producto');
//Vamos a importar el bcrypt para por Hashear las passwords
const bcryptjs = require('bcryptjs');
//Importamos variables de entorno
require('dotenv').config({path : 'variables.env'});
//Importamos el Web Token
const jwt = require('jsonwebtoken');
//creamos funcion para generar Tokens
const crearToken = (usuario, secret, expiresIn)=>{
    const {id, email, nombre, apellido, creado} = usuario;
    return jwt.sign({id, email, nombre, apellido, creado}, secret, {expiresIn})
}

//Configuramos los Resolvers, estos tienen que estar antes en el Schema
const resolvers = {
   Query:{
       obtenerUsuario: async (_,{token}) =>{
        const user = await jwt.verify(token, process.env.SECRETA);
        return user
       },
       obtenerUsuarios: async (_, { input })=>{
           const existeUsuario = await Usuario.find();
           if(!existeUsuario[0]){throw new Error('No hay usuarios disponibles');}
           try {
               return Usuario.find();
           } catch (error) {
               console.log(error);
           }
       },
       obtenerProductos : async() =>{
           try{
                return Producto.find();
           }catch(error){
               console.log(error);
           }
       },
       obtenerProductosById : async(_,{id})=>{
            const existeProducto = await Producto.findById(id);
            if(!existeProducto){throw new Error('No hay Productos con ese Id');} 
            try {
                return existeProducto;
            } catch (error) {
                console.log(error);
            }
       }
   },
   Mutation : {
       nuevoUsuario : async (_, { input }) => {
            //Rescatamos valores de Input
            const {email, password} = input;
            const existeUsuario = await Usuario.findOne({email});
            //Validamos si existe el Usuario
            if(existeUsuario){throw new Error('Ya está registrado ese Usuario'); }
                
            const salt = await bcryptjs.genSalt(10);
            //Tomaremos el objeto de input y modificaremos solo el password
            input.password = await bcryptjs.hash(password,salt);

            try {
                //Creamos una instancia del objeto y luego le damos .save, solo para insertarlo en una nueva collection
                const usuario = new Usuario(input);
                usuario.save();
                //Nos va a regresar el usuario, ya que en el gql así lo especificamos
                return usuario;
            } catch (error) {
                console.log(error);
            }
       },
       autenticarUsuario : async(_,{input}) =>{

        const {email, password} = input;
        const existeUsuario = await Usuario.findOne({email});
        if(!existeUsuario){throw new Error('Este usuario no existe');}
        const passwordCorrecto = await bcryptjs.compare(password,existeUsuario.password);
        if(!passwordCorrecto){throw new Error('Este password es incorrecto');}
        return{
            token : crearToken(existeUsuario, process.env.SECRETA, '24h')
        }

       },
       nuevoProducto : async (_,{input})=>{
           const {nombre} = input;
           const existeUsuario = await Producto.findOne({nombre});
           if(existeUsuario){throw new Error('Ya existe un producto con ese nombre');}
           try {
               const producto = new Producto(input);
               producto.save();
               return producto;
           } catch (error) {
               console.log(error);
           }
       },
       actualizarProducto : async (_,{id, input})=>{
            const existeProducto = await Producto.findById(id);
            if(!existeProducto){throw new Error('No hay Productos con ese Id');} 

            producto = await Producto.findByIdAndUpdate({_id : id}, input, {new : true});

            return producto;
       },
       eliminarProducto : async(_,{id})=>{
            const existeProducto = await Producto.findById(id);
            if(!existeProducto){throw new Error('No hay Productos con ese Id');} 
            await Producto.findByIdAndDelete({ _id : id });
            return "Producto Eliminado";
       }
   }
}

module.exports = resolvers;