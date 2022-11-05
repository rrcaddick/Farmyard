import { Box, CircularProgress, Typography, Button } from "@mui/material";
import { useGetCurrentCapcity } from "../graphql/parkCapacity/hooks";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Home = () => {
  const { currentCapcity, loading, error, refetch } = useGetCurrentCapcity();
  const value = (currentCapcity?.getCurrentCapcity?.people / 1500).toFixed(4);
  return (
    <Box display="flex" justifyContent="space-evenly" alignItems="center" flexDirection="column" flexGrow={1}>
      <Typography fontSize="2rem">PARK CAPACITY</Typography>
      {loading && <CircularProgress />}
      {!loading && (
        <Box width="60%">
          <CircularProgressbar
            value={currentCapcity?.getCurrentCapcity?.people}
            maxValue={1500}
            text={`${value * 100}%`}
          />
        </Box>
      )}
      {!loading && (
        <Box sx={{ textAlign: "center" }}>
          <Typography>Total People: {currentCapcity?.getCurrentCapcity?.people}</Typography>
          <Typography>Total Vehicles: {currentCapcity?.getCurrentCapcity?.vehicles}</Typography>
          <Typography>
            Total Income:{" "}
            {(currentCapcity?.getCurrentCapcity?.totalAmount / 100).toLocaleString("en-ZA", {
              style: "currency",
              currency: "ZAR",
            })}
          </Typography>
          <Typography>
            Total Card:{" "}
            {(currentCapcity?.getCurrentCapcity?.totalCard / 100).toLocaleString("en-ZA", {
              style: "currency",
              currency: "ZAR",
            })}
          </Typography>
          <Typography>
            Total Cash:{" "}
            {(currentCapcity?.getCurrentCapcity?.totalCash / 100).toLocaleString("en-ZA", {
              style: "currency",
              currency: "ZAR",
            })}
          </Typography>
          <Box marginTop="2rem">
            <Button
              variant="contained"
              onClick={() => {
                console.log("refetching");
                refetch();
              }}
            >
              Refresh Values
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
