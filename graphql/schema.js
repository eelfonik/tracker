const { gql } = require('apollo-server');

const types = gql`
type Query {
  # as all query in graphQl is possiblly nullable by default
  # ! means it's not nullable
  invoices: [Invoice]!
  invoice(id: ID!): Invoice
  # Queries for the current user
  user: User
}

type User {
  email: String!
  username: String!
}

type Invoice {
  _creator: String!
  number: String!
  date: String!
  sum: String!
  taxRate: String!
  currency: String!
  description: String
  client: Client!,
}

type Client {
  name: String!,
  address: String!,
  siret: String,
}

# mutation means modification to data, you can roughly take it as the POST/DELETE of http requests
type Mutation {
  onLoginClick(value: LoginReq): LoginRes!,
  onSignupClick(value: LoginReq): LoginRes!,
  onLogoutClick(): void
}

# N.B. we must use the Input type to indicates it's an Input for Mutation
input LoginReq {
  name: String,
  email: String!,
  emailValid: Boolean,
  pass: String!,
}

type LoginRes {
  success: Boolean!,
  extras: LoginExtras!,
}

type LoginExtras {
  sessionId: String,
  userId: String,
  userProfileModel: User!,
  msg: Int,
}
`


module.exports = types;