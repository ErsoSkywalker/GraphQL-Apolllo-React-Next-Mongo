//Importamos Apollo Server
const {gql } = require('apollo-server');
//Aquí definiremos los tipos, es como una analogía a los objetos o las Entidades en Hibernate,
//algo así lo entiendo yo
const typeDefs = gql`

    type Query{
        obtenerCurso : String
    }

`;

module.exports = typeDefs;