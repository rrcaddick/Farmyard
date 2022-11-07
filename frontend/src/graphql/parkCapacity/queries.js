import { gql } from "@apollo/client";

const GET_CURRENT_CAPCITY = gql`
  query GetCurrentCapcity($date: String) {
    getCurrentCapcity(date: $date) {
      people
      vehicles
      group
      totalAmount
      totalCard
      totalCash
    }
  }
`;

export { GET_CURRENT_CAPCITY };
