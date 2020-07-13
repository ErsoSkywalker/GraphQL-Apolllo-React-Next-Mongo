//Importamos Apollo Server
const {gql } = require('apollo-server');
//Aquí definiremos los tipos, es como una analogía a los objetos o las Entidades en Hibernate,
//algo así lo entiendo yo
const typeDefs = gql`

    type Usuario{
        id : ID
        nombre : String
        apellido : String
        email : String
        creado : String
    }

    input UsuarioInput{
        nombre : String!
        apellido : String!
        email : String!
        password : String!
    }

    type Query{
        obtenerCurso : String
    }

    type Mutation{
        nuevoUsuario(input : UsuarioInput) : Usuario
    }

`;

module.exports = typeDefs;