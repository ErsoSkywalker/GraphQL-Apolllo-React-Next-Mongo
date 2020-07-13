//Importamos Apollo Server
const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers')
const conectarDB = require('./config/db');

//Acá ya conectamos a la DB
conectarDB();

//Le damos al Apollo Server la configuración Necesaria
const server = new ApolloServer({
    typeDefs,
    resolvers
});

//Empezamos la App
server.listen().then(({url})=>{
    console.log(`El servidor está corriendo en la URL ${url}`)
});