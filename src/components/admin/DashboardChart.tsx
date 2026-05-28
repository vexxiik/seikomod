"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec'];
const revenues = [45000, 52000, 38000, 65000, 82000, 71000, 95000];
const expenses = [21000, 28000, 19000, 32000, 41000, 35000, 48000];

export function DashboardChart() {
  const data = {
    labels: months,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Tržby (Kč)',
        backgroundColor: '#1a2b3c', // primary
        data: revenues,
        borderRadius: 4,
      },
      {
        type: 'line' as const,
        label: 'Výdaje (Kč)',
        borderColor: '#fbbf24', // accent
        backgroundColor: '#fbbf24',
        borderWidth: 3,
        data: expenses,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-full p-4">
      <Bar data={data} options={options} />
    </div>
  );
}
