import { Line } from 'react-chartjs-2'
import numeral from "numeral"
import './Graph.css'

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
		xAxes: [
			{
				type: "time",
				time: {
					format: "MM/DD/YY",
					tooltipFormat: "ll",
				},
			},
		],
		yAxes: [
			{
				gridLines: {
					display: false,
				},
				ticks: {
					// Include a dollar sign in the ticks
					callback: function (value, index, values) {
						return numeral(value).format("0a");
					},
				},
			},
		],
	},
}

const buildChartData = (data, type, origin) => {
  let chartData = []
  let lastDatePoint

  for( let date in data[`${type}`]) {
    if(lastDatePoint) { 
      let newDatePoint = {
        x: date,
        y: origin === 'csv'? data[`${type}`][date] : (data[`${type}`][date] - lastDatePoint >= 0 ? data[`${type}`][date] - lastDatePoint : 0),
      }
      chartData.push(newDatePoint)
    }
    lastDatePoint = data[`${type}`][date]
    
  }
  return chartData
}

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
  },
  vaccination: {
    backgroundColor: "rgba(16, 204, 52, 0.5)",
    borderColor: "#10cc4f",
  }
}

const Graph = ({ data, type, origin='api', background }) => {
    
  	var chartData = buildChartData(data, type, origin)
	console.log(chartData)

  	return (
		<div className="chart-container" style={{background:`${background}`,}}>
			<Line 
				data={{
					datasets: [
						{
							backgroundColor: chartColor[`${type}`]['backgroundColor'],
							borderColor: chartColor[`${type}`]['borderColor'],
							data: chartData,
						},
					],
				}}
				options={options}
			/>
		</div>
  	)
};

export default Graph