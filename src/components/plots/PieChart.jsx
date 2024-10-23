import React, { useEffect, useRef } from "react";

// chart js package
import Chart from "chart.js/auto";

const PieChart = ({ data }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const buildChart = async () => {
      try {
        // below uses default data if data is not given
        const chartData = data
          ? data
          : {
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
        generateChart(chartData);
        // await setChart(newChart);
      } catch (error) {
        console.error(error);
      }
    };
    buildChart();

    return () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        let prevChart = Chart.getChart(canvas);
        if (prevChart) prevChart.destroy();
      }
    };
  }, [data]);

  const generateChart = (chartData) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // destroy previous chart information
    let prevChart = Chart.getChart(canvas);
    if (prevChart) prevChart.destroy();

    // below set up piechart options and plugins
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
      data: chartData,
      options: options,
      plugins: plugins,
    };

    new Chart(canvas, config);
  };

  return <canvas ref={canvasRef}></canvas>;
};

export default PieChart;
