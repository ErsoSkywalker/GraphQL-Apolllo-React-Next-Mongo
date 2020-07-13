
//Importamos Apollo Server
const { ApolloServer} = require('apollo-server');
//Importamos los modelos
const Usuario = require('../models/usuarios');
//Configuramos los Resolvers, estos tienen que estar antes en el Schema
const resolvers = {
   Query:{
       obtenerCurso : () => "Algo"
   },
   Mutation : {
       nuevoUsuario : async (_, { input }) => {
            //Rescatamos valores de Input
            const {email, password} = input;
            const existeUsuario = await Usuario.findOne({email});
            //Validamos si existe el Usuario
            if(existeUsuario){throw new Error('Ya está registrado ese Usuario'); }
                
            try {
                const usuario = new Usuario(input);
                usuario.save();
                return usuario;
            } catch (error) {
                console.log(error);
            }
       }
   }
}

module.exports = resolvers;