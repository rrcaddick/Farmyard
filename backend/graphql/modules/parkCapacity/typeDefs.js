const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getCurrentCapcity(date: String): ParkCapacity
  }

  type ParkCapacity {
    people: Int
    vehicles: Int
    group: Int
    totalAmount: Int
    totalCard: Int
    totalCash: Int
  }
`;

module.exports = {
  typeDefs,
};
