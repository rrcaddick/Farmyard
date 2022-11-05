import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const createClient = () => {
  const httpLink = createHttpLink({
    uri: "/graphql",
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return client;
};

export { createClient };
