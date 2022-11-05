const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getCurrentCapcity: ParkCapacity
  }

  type ParkCapacity {
    people: Int
    vehicles: Int
    totalAmount: Int
    totalCard: Int
    totalCash: Int
  }
`;

module.exports = {
  typeDefs,
};
