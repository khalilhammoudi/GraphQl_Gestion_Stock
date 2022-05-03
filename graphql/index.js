const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./Routes/typeDefs');
const resolvers = require('./Routes/Resolvers');


// Le constructeur d'ApolloServer nécessite 2 paramètres : le schéma définie
// et l'ensemble de résolveurs
const server = new ApolloServer({ typeDefs, resolvers });

// La méthode 'Listen' lance le serveur web
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});