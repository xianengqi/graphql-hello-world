const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    hello(name: String): String
    user: User
  }
  type User {
    id: ID!
    username: String!
  }
  type Error {
    field: String!
    message: String!
  }
  input UserInfo {
    username: String!
    password: String!
    age: Int
  }
  type RegisterResponse {
    error: [Error!]!
    user: User!
  }
  type Mutation {
    register(userInfo: UserInfo!): RegisterResponse!
    login(userInfo: UserInfo!): String!
  }
`;

const resolvers = {
  Query: {
    hello: (parent, { name }) => {
      return `hey ${name}`;
    },
    user: () => ({
      id: 1,
      username: "bob",
    }),
  },
  Mutation: {
    login: (parent, { userInfo: { username } }, context, info) => {
     // console.log(context)
      return username;
    },
    register: () => ({
      error: [
        {
          field: "username",
          message: "bad",
        },
      ],
      // error: null,
      user: {
        id: 1,
        username: "bob",
      },
    }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req, res}) => ({req, res})
});

server.listen().then(({ url }) => console.log(`server started at ${url}`));
