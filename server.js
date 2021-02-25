const { ApolloServer, gql } = require('apollo-server');
const { usersData, productsData, beerData, wineData, tobaccoData, vapeData } = require('./assets/data')

const typeDefs = gql`

  type User {
    id: ID!
    name: String
    email: String,
    username: String
    password: String
  }

  type Product {
    id: ID!
    title: String
    image: String
  }

  type Beer {
    id: ID!
    title: String
    price: String
    image: String
  }

  type Wine {
    id: ID!
    title: String
    price: String
    image: String
  }

  type Tobacco {
    id: ID!
    title: String
    price: String
    image: String
  }

  type Vape {
    id: ID!
    title: String
    price: String
    image: String
  }

  type Query {
    usersData: [User]
    user(id: ID!): User
    products: [Product]
    beer: [Beer]
    wine: [Wine]
    tobacco: [Tobacco]
    vape: [Vape]
  }

  type Mutation {
    addUser(name: String, email: String, username: String, password: String): User
  }
  
`;

const resolvers = {
    Query: {
      usersData: () => usersData,
      user(parent, args) {
          return users.find(user => user.id == args.id);
      },
      products: () => productsData,
      beer: () => beerData,
      wine: () => wineData,
      tobacco: () => tobaccoData,
      vape: () => vapeData,
    },
    Mutation: {
      addUser: (parent, args) => {
        const newUser = {
          id: users.length + 1,
          name: args.name,
          email: args.email,
          username: args.username,
          password: args.password
        };
        users.push(newUser);
        return newUser;
      }
    }
  };
  
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
