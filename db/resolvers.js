
//Importamos Apollo Server
const { ApolloServer} = require('apollo-server');

const resolvers = {
   Query:{
       obtenerCurso : () => "Algo"
   }
}

module.exports = resolvers;