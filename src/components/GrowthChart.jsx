import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const GrowthChart = ({ dataPoints, companyName, integrationMonth }) => {
  const labels = dataPoints.map((_, i) => `Month ${i + 1}`);
  const data = {
    labels,
    datasets: [
      {
        label: companyName,
        data: dataPoints,
        borderColor: 'rgb(52, 211, 153)',
        backgroundColor: 'rgba(52, 211, 153, 0.5)',
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y.toFixed(0)} appointments`;
            }
            return label;
          }
        }
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: integrationMonth - 1, // Chart.js labels are 0-indexed
            xMax: integrationMonth - 1,
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              content: 'AI Integrated',
              enabled: true,
              position: 'top',
              backgroundColor: 'rgba(255, 99, 132, 0.8)',
              color: 'white',
              font: { size: 10 }
            }
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
      y: {
        grid: {
          color: '#e5e7eb',
        },
        ticks: {
          callback: function(value) {
            return `${value} appointments`;
          },
          color: '#6b7280',
        },
      },
    },
  };

  return (
    <div style={{ height: '150px', width: '100%' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default GrowthChart;
