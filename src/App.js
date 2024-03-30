import React, { useState } from 'react';
import Papa from 'papaparse';
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
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const options = {
  plugins: {
    datalabels: {
      color: '#666',
      display: true,
      anchor: 'end',
      align: 'end',
      offset: 10,
    },
    tooltip: {
      callbacks: {
        title: function(tooltipItems, data) {
          return 'Date: ' + tooltipItems[0].label;
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        autoSkip: true,
        maxRotation: 45,
        minRotation: 45,
      },
    },
    y: {
      beginAtZero: true,
      grace: '5%',
    }
  },
  onClick: (event, elements, chart) => {
    if (elements.length > 0) {
      const elementIndex = elements[0].index;
      const label = chart.data.labels[elementIndex];
      chart.config._config.onClickLabel(label);
    }
  },
};

function App() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [mealDetails, setMealDetails] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function(results) {
        const data = results.data;
        const mealsByDate = {};
        const aggregatedData = data.reduce((acc, cur) => {
          const date = cur.Date;
          mealsByDate[date] = mealsByDate[date] || [];
          mealsByDate[date].push({ item: cur.Meal, protein: cur['Protein (g)'], calories: cur.Calories });

          if (acc[date]) {
            acc[date].calories += cur.Calories;
            acc[date].protein += cur['Protein (g)'];
          } else {
            acc[date] = { calories: cur.Calories, protein: cur['Protein (g)'] };
          }
          return acc;
        }, {});

        const labels = Object.keys(aggregatedData);
        const caloriesData = Object.values(aggregatedData).map((d) => Math.round(d.calories));
        const proteinData = Object.values(aggregatedData).map((d) => Math.round(d.protein));

        setChartData({
          labels,
          datasets: [
            {
              label: 'Calories',
              data: caloriesData,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Protein (g)',
              data: proteinData,
              borderColor: 'rgb(54, 162, 235)',
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
          ],
        });

        // Attach the function to handle click events on labels
        options.onClickLabel = (label) => {
          setMealDetails(mealsByDate[label] || []);
        };
      },
    });
  };

  return (
    <div>
      <h2>Nutrition Data Visualizer</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <Line data={chartData} options={options} />
      <div>
        {mealDetails.length > 0 && (
          <div>
            <h3>Meals on Selected Date</h3>
            <ul>
              {mealDetails.map((meal, index) => (
                <li key={index}>
                  {meal.item}, Protein: {meal.protein}g, Calories: {meal.calories} cal
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
