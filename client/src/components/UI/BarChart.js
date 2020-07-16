import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          title: {
            display: true,
            text: "Individual question pass rate",
            fontSize: 20,
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          responsive: true,
        }}
      />
    </div>
  );
};

export default BarChart;
