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

    type Cliente{
        id : ID
        nombre : String
        apellido : String
        empresa : String
        email : String
        telefono : String
        creado : String
        vendedor : ID
    }

    type Usuario{
        id : ID
        nombre : String
        apellido : String
        email : String
        creado : String
    }

    input PedidoProductoInput{
        id : ID!
        cantidad : Int!
    }

    input PedidoInput{
        pedido : [PedidoProductoInput]!
        total : Float!
        cliente : ID!
        estado : EstadoPedido!
    }

    enum EstadoPedido{
        PENDIENTE
        COMPLETADO
        CANCELADO
    }

    type PedidoGrupo{
        id : ID
        cantidad : Int
    }

    type Pedido{
        id : ID
        pedido : [PedidoGrupo]
        total : Float
        cliente : ID
        vendedor : ID
        creado : String
        estado : EstadoPedido
    }

    type TopCliente{
        total : Float
        cliente : [Cliente]
    }

    type TopVendedor{
        total : Float
        vendedor : [Usuario]
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

    input ClienteInput{
        nombre : String!
        apellido : String! 
        empresa : String!
        email : String!
        telefono : String
    }

    type Query{
        #Usuarios
        obtenerUsuario(token : String!) : Usuario
        obtenerUsuarios : [Usuario]
        #Productos
        obtenerProductos : [Producto]
        obtenerProductosById(id : ID!) : Producto
        #Clientes
        obtenerClientes : [Cliente]
        obtenerClientesByVendedor: [Cliente]
        obtenerClientesById(id : ID!) : Cliente
        #Pedidos 
        obtenerPedidos : [Pedido]
        obtenerPedidosByVendedor : [Pedido]
        obtenerPedidosByCliente(id : ID!) : [Pedido]
        obtenerPedidoById(id : ID!) : Pedido
        obtenerPedidosByState(estado : String!) : [Pedido]

        #Consultas pesadas

        obtenerMejoresClientes : [TopCliente]
        obtenerMejoresVendedores : [TopVendedor]
        buscarProducto( texto : String! ) : [Producto]
    }

    type Mutation{

        #Usuarios
        nuevoUsuario(input : UsuarioInput!) : Usuario
        autenticarUsuario(input : AutenticarInput!) : Token
        #Productos
        nuevoProducto(input : ProductoInput!) : Producto
        actualizarProducto(id : ID!, input : ProductoInput!) : Producto
        eliminarProducto(id : ID!) : String
        #Clientes
        nuevoCliente(input : ClienteInput!) : Cliente
        actualizarCliente(id : ID!, input : ClienteInput!) : Cliente
        eliminarCliente(id : ID!) : String
        #Insertar Pedidos
        insertarPedido(input : PedidoInput!) : Pedido
        actualizarPedido(id : ID!, input : PedidoInput!) : Pedido
        eliminarPedido(id : ID!) : String
    }

`;

module.exports = typeDefs;