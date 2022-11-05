import { Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import Home from "./pages/Home";
import { createClient } from "./graphql/client";

const App = () => {
  const client = createClient();
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ApolloProvider>
  );
};

export default App;
