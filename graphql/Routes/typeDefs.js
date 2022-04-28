const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
 const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    nom: String!
    prenom: String!
    token:String
    role:String
    created_at:String
    update_at:String
  }
  type Product{
    nom: String
    description:String
    token:String
    price:String
    stock:String
    reference:String
    created_at:String
    update_at:String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
       users:[User]!
       products:[Product]!
       delUser(nom:String):User
       delProduct(reference:String):Product
  }
  input user {
    nom: String
    prenom: String
    token:String
    role:String
    created_at:String
    update_at:String
  }
  input product{
    nom: String
    description:String!
    token:String
    price:Int!
    stock:String
    reference:String!
    created_at:String
    update_at:String
  }
  input updatedProduct{
    nom: String
    description:String
    token:String
    price:Int
    stock:String
    reference:String
    created_at:String
    update_at:String
  }
type Mutation{
   
  addUser(user:user):User
  updateUser(user:user):User
  addProduct(product:product):Product
  updateProduct(product:updatedProduct):Product
}

`;

module.exports = typeDefs














