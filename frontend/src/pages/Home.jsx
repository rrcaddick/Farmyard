import { Box, CircularProgress, Typography, Button, TextField } from "@mui/material";
import { useGetCurrentCapcity } from "../graphql/parkCapacity/hooks";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import moment from "moment";

const Home = () => {
  const { currentCapcity, loading, error, refetch } = useGetCurrentCapcity();
  const [groupBookings, setGroupBookings] = useState(0);
  const [onlineTickets, setOnlineTickets] = useState(0);
  const maxValue = 1500 - groupBookings - onlineTickets;
  const progressValue = currentCapcity?.getCurrentCapcity?.people / maxValue;
  const [date, setDate] = useState(moment());

  return (
    <Box
      display="flex"
      justifyContent={loading ? "flex-start" : "space-evenly"}
      gap={loading ? "2rem" : "0"}
      marginTop={loading ? "2rem" : "0"}
      alignItems="center"
      flexDirection="column"
      flexGrow={1}
    >
      <Typography fontSize="2rem">PARK CAPACITY</Typography>
      <DatePicker
        label="Select Date"
        value={date}
        closeOnSelect={true}
        onChange={(newValue) => {
          setDate(newValue);
          setGroupBookings(0);
          setOnlineTickets(0);
          refetch({ date: newValue });
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <Box display="flex" p="0 2rem" gap="1rem">
        <TextField
          type="number"
          label="Group Bookings"
          value={groupBookings}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            setGroupBookings(e.target.value);
          }}
        />
        <TextField
          type="number"
          label="Online Tickets"
          value={onlineTickets}
          InputLabelProps={{ shrink: true }}
          onChange={(e) => {
            setOnlineTickets(e.target.value);
          }}
        />
      </Box>
      {loading && <CircularProgress />}
      {!loading && (
        <Box width="60%" maxWidth="300px">
          <CircularProgressbar
            value={currentCapcity?.getCurrentCapcity?.people}
            maxValue={maxValue}
            text={`${(progressValue * 100).toFixed(2)}%`}
          />
        </Box>
      )}
      {!loading && (
        <Box sx={{ textAlign: "center" }}>
          <Typography>
            Total Public: {Number(currentCapcity?.getCurrentCapcity?.people) + Number(onlineTickets)}
          </Typography>
          <Typography>Total Vehicles: {currentCapcity?.getCurrentCapcity?.vehicles}</Typography>
          <Typography>Total Group: {currentCapcity?.getCurrentCapcity?.group}</Typography>
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
                setDate(moment());
                refetch({ date: moment() });
              }}
            >
              Refresh Today
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
