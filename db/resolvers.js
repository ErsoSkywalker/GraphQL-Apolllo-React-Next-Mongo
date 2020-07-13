
//Importamos Apollo Server
const { ApolloServer} = require('apollo-server');
//Importamos los modelos
const Usuario = require('../models/usuarios');
//Configuramos los Resolvers, estos tienen que estar antes en el Schema
const resolvers = {
   Query:{
       obtenerCurso : () => "Algo",
       obtenerUsuarios: async (_, { input })=>{
           const existeUsuario = await Usuario.find();
           if(!existeUsuario[0]){throw new Error('No hay usuarios disponibles');}
           try {
               return Usuario.find();
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
                
            try {
                //Creamos una instancia del objeto y luego le damos .save, solo para insertarlo en una nueva collection
                const usuario = new Usuario(input);
                usuario.save();
                //Nos va a regresar el usuario, ya que en el gql así lo especificamos
                return usuario;
            } catch (error) {
                console.log(error);
            }
       }
   }
}

module.exports = resolvers;