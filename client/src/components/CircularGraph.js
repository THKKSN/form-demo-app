import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "../styles/css/resultPage/CircularGraph.module.css";


ChartJS.register(ArcElement, Tooltip, Legend);

const getEvaluationColor = (criteria) => {
    switch (criteria) {
        case "ดีเด่น":
            return "#108600c4";
        case "ดีมาก":
            return "#16be00c4";
        case "ดี":
            return "#f5c800";
        case "พอใช้":
            return "#ffa500";
        case "ต้องปรับปรุง":
            return "#f00";
        default:
            return "#000";
    }
};

const CircularGraph = ({ data, labels, evaluation }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(0, 250, 50, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(0, 250, 50, 1)"],
        borderWidth: 1,
        hoverOffset: 30, 
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label;
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          },
        },
      },
    },
    elements: {
      center: {
        text: `${evaluation}%`,
        color: "#000000",
        fontStyle: "Sarabun",
        sidePadding: 20,
      },
    },
  };

  console.log(`Evaluation: ${evaluation}`);
  const evaluationColor = getEvaluationColor(evaluation);
  console.log(`Color: ${evaluationColor}`);

  return (
    <div className={styles.graphContainer}>
      <Doughnut data={chartData} options={options} />
      <div className={styles.chartText} style={{ color: evaluationColor }}>
        <h1>{evaluation}</h1>
      </div>
    </div>
  );
};

export default CircularGraph;