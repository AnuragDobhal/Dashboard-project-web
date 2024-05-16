import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ReactECharts from "echarts-for-react";

function PieChartDash() {
  const palette = ["#f95d15", "#56e743", "#ff0000", "#007bff"]; // Adding one more color for an additional data point
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        const totalCases = data.cases;
        const recoveredCases = data.recovered;
        const deathCases = data.deaths;
        setData({
          total: totalCases,
          recovered: recoveredCases,
          deaths: deathCases,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const option = {
    color: palette,
    series: [
      {
        type: "pie",
        radius: "55%",
        data: [
          { name: "Total Cases", value: data?.total },
          { name: "Recovered Cases", value: data?.recovered },
          { name: "Death Cases", value: data?.deaths },
        ],
      },
    ],
  };

  return (
    <Stack direction="row" width="100%" textAlign="center" spacing={2}>
      <Box flexGrow={1}>
        <ReactECharts option={option} style={{ height: 250 }} />
      </Box>
    </Stack>
  );
}

export default PieChartDash;
