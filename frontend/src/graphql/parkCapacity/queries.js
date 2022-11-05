import { gql } from "@apollo/client";

const GET_CURRENT_CAPCITY = gql`
  query GetCurrentCapcity {
    getCurrentCapcity {
      people
      vehicles
      totalAmount
      totalCard
      totalCash
    }
  }
`;

export { GET_CURRENT_CAPCITY };
