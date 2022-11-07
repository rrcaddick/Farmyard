import { Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import Home from "./pages/Home";
import { createClient } from "./graphql/client";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";

const App = () => {
  const client = createClient();
  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </LocalizationProvider>
    </ApolloProvider>
  );
};

export default App;
