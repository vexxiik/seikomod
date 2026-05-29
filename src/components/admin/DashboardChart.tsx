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

import { useEffect, useState } from "react";

const months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];

export function DashboardChart({
  revenues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  expenses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}: {
  revenues?: number[];
  expenses?: number[];
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full flex items-center justify-center text-muted-foreground">Načítám graf...</div>;
  }

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
      <Bar data={data as any} options={options} />
    </div>
  );
}
