import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Registrar los módulos de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "fitness_data"));
      const data = querySnapshot.docs.map(doc => doc.data()).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      setChartData({
        labels: data.map(entry => entry.fecha),
        datasets: [
          {
            label: "Peso (kg)",
            data: data.map(entry => entry.peso),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "80%", margin: "auto", background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      <h2>Progreso de Peso</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ProgressChart;
