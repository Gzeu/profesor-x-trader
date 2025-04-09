"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend);

export default function PriceChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "BTC/USDT",
        data: [],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch("/api/price");
      const data = await res.json();
      const newPrice = data.btc;

      setChartData((prev) => {
        const newLabels = [...prev.labels, new Date().toLocaleTimeString()];
        if (newLabels.length > 12) newLabels.shift();
        const newData = [...prev.datasets[0].data, newPrice];
        if (newData.length > 12) newData.shift();

        return {
          labels: newLabels,
          datasets: [
            {
              ...prev.datasets[0],
              data: newData,
            },
          ],
        };
      });
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full">
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: { grid: { display: false, drawBorder: false }, ticks: { color: "#6b7280" } },
            y: { grid: { color: "rgba(255, 255, 255, 0.05)", drawBorder: false }, ticks: { color: "#6b7280" } },
          },
        }}
      />
    </div>
  );
}