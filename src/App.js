import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const darkChristmasTheme = createTheme({
  palette: {
    type: "dark", // Use dark mode
    primary: {
      main: "#c62828", // Deep red
    },
    secondary: {
      main: "#2e7d32", // Dark green
    },
  },
});

function App() {
  const [data, setData] = useState([]);
  const [revealedDate, setRevealedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/lumagician/it-advent/master/data/calendar.json"
        );
        const jsonData = await response.json();
        setData(jsonData.topics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const revealDate = (date) => {
    setRevealedDate(date);
  };

  return (
    <ThemeProvider theme={darkChristmasTheme}>
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          IT Advent Calendar
        </Typography>

        <Grid container spacing={3}>
          {data.map((topic) => {
            const isPastDate = new Date(topic.date) < new Date();
            const isCurrentDate = topic.date === revealedDate;
            const isFutureDate = new Date(topic.date) > new Date();

            return (
              <Grid item xs={12} md={6} lg={4} key={topic.date}>
                <Card
                  style={{
                    cursor: isFutureDate ? "not-allowed" : "pointer",
                    backgroundColor: isCurrentDate
                      ? darkChristmasTheme.palette.secondary.main
                      : "",
                    height: "100%", // Set a fixed height for each Card
                    minHeight: "200px", // Set a minimum height if needed
                  }}
                  onClick={() => !isFutureDate && revealDate(topic.date)}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {topic.name}
                    </Typography>
                    <Typography color="text.secondary">{topic.date}</Typography>
                    <Typography>
                      {isPastDate || isCurrentDate
                        ? topic.explanation.english
                        : "Future date - Cannot be revealed"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
