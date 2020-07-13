//Importamos Apollo Server
const {gql } = require('apollo-server');
//Aquí definiremos los tipos, es como una analogía a los objetos o las Entidades en Hibernate,
//algo así lo entiendo yo
const typeDefs = gql`

    type Producto{
        id : ID
        nombre : String
        existencia : Int
        precio : Float
        creado : String
    }

    type Usuario{
        id : ID
        nombre : String
        apellido : String
        email : String
        creado : String
    }

    type Token{
        token : String
    }

    input UsuarioInput{
        nombre : String!
        apellido : String!
        email : String!
        password : String!
    }

    input ProductoInput{
        nombre : String!
        precio : Float!
        existencia : Int!
    }

    input AutenticarInput{
        email : String!
        password : String!
    }

    type Query{
        obtenerUsuario(token : String!) : Usuario
        obtenerUsuarios : [Usuario]
        obtenerProductos : [Producto]
    }

    type Mutation{
        nuevoUsuario(input : UsuarioInput!) : Usuario
        autenticarUsuario(input : AutenticarInput!) : Token
        nuevoProducto(input : ProductoInput!) : Producto
    }

`;

module.exports = typeDefs;