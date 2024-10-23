import React, { useEffect, useState } from "react";

// chart js package
import Chart from "chart.js/auto";

const PieChart = ({ data }) => {
  const [chart, setChart] = useState();

  useEffect(() => {
    if (chart) chart.destroy();

    try {
      generateChart();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const generateChart = () => {
    if (chart) chart.destroy();

    const canvas = document.getElementById("acquisitions");

    const defaultData = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          position: "right",
        },
      },
    };

    const plugins = {};

    const config = {
      type: "doughnut",
      data: data ? data : defaultData,
      options: options,
      plugins: plugins,
    };

    setChart(new Chart(canvas, config));
  };

  return <canvas id="acquisitions"></canvas>;
};

export default PieChart;
