import { Line } from 'react-chartjs-2'
import numeral from "numeral"
import './GraphIndia.css'

const GraphIndia = ({ data, type, place }) => {
    
  const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0")
        },
      },
    },
    scales: {
      x: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      y: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a")
            },
          },
        },
      ],
    },
  };

  const chartColor = {
    cases: {
      backgroundColor: "rgba(204, 16, 52, 0.5)",
      borderColor: "#CC1034",
    },
    deaths: {
      backgroundColor: "rgba(16, 16, 16, 0.7)",
      borderColor: "#1e1f1e",
    },
    recovered: {
      backgroundColor: "rgba(16, 204, 52, 0.5)",
      borderColor: "#10cc4f",
    }
  }

  const buildChartData = (data, type, place) => {
    let chartData = []
    let lastDatePoint = 0

    for (let d=0; d<data[place][type].length; d++) {
        chartData.push(data[place][type][d] - lastDatePoint >= 0 ? data[place][type][d] - lastDatePoint: 0)
        lastDatePoint = data[place][type][d]
      } 
    
    return chartData
  }

  return (
    <div className="india-chart-container">
      <Line 
        data={{
          labels: data[place].dates,
          datasets: [
            {
              label: 'cases',
              data: buildChartData(data, type, place),
							backgroundColor: chartColor[type]['backgroundColor'],
							borderColor: chartColor[type]['borderColor'],
            },
          ],
        }}
        options={options}
      />
    </div>
  )
};

export default GraphIndia