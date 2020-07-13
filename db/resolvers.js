
//Importamos Apollo Server
const { ApolloServer} = require('apollo-server');
//Configuramos los Resolvers, estos tienen que estar antes en el Schema
const resolvers = {
   Query:{
       obtenerCurso : () => "Algo"
   }
}

module.exports = resolvers;