import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tables from './components/Tables'
import Stats from './components/Stats'
import Map from './components/Map'
import GraphSection from './components/GraphSection'
import IndiaSection from './components/IndiaSection'
import Footer from './components/Footer'
import './App.css'
import dwhd from './data/districts_wise_historical_data.json'
import sadnl from './data/states_and_districts_list'
import swd from './data/state_wise_data'

function App() {

	const numberOfDays = () => {
		const d1 = new Date('01/21/2020')
		const d2 = new Date()
		const timeDifference = d2.getTime() - d1.getTime()
		const totalNumberOfDays = Math.floor(timeDifference / (1000 * 3600 * 24))
		
		console.log(totalNumberOfDays)
		return totalNumberOfDays
	}

	const [allCountries, setAllCountries] = useState([])
	const [currentCountry, setCurrentCountry] = useState('worldWide')
	const [currentCountryData, setCurrentCountryData] = useState({})
	const [historicalData, setHistoricalData] = useState([])
	const [vaccinationData, setVaccinationData] = useState([])
	const [days, setDays] = useState(numberOfDays());
	const [type, setType] = useState('cases');
	const [graphBackground, SetGraphBackground] = useState('rgba( 231, 16, 16, 0.10 )')
	const [mapCenter, setMapCenter] = useState([78.9629, 20.5937])


	const [currentState, setCurrentState] = useState(0)
	const [currentDistrict, setCurrentDistrict] = useState(1)


	useEffect(() => {
		const getCountries = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
			.then(response => response.json())
			.then(data => setAllCountries(data))
		}

		getCountries()

	}, [])

	useEffect(() => {
		const getCurrentCountryData = async () => {
			const url = currentCountry !== 'worldWide'? 
			`https://disease.sh/v3/covid-19/countries/${currentCountry}?yesterday=true&twoDaysAgo=false&strict=true&allowNull=false`
			:'https://disease.sh/v3/covid-19/all?yesterday=true&twoDaysAgo=false&allowNull=false'

			await fetch(url)
			.then(response => response.json())
			.then(data => {
				setCurrentCountryData(data)
				setMapCenter(currentCountry !== 'worldWide'? [data.countryInfo.long, data.countryInfo.lat] : [78.9629, 20.5937])
			})
		}

		const getHistorical = async () => {
			const url = currentCountry !== 'worldWide'?
				`https://disease.sh/v3/covid-19/historical/${currentCountry}?lastdays=${days}`
				:`https://disease.sh/v3/covid-19/historical/all?lastdays=${days}`

			await fetch(url)
			.then(response => response.json())
			.then(data => {
				const filterData = currentCountry === 'worldWide'? data
					: {
						cases: data.timeline.cases,
						recovered: data.timeline.recovered,
						deaths: data.timeline.deaths
				}
				setHistoricalData(filterData)
			})
		}

		const getVaccinationHistorical = async () => {
			const url = currentCountry !== 'worldWide'? 
			`https://disease.sh/v3/covid-19/vaccine/coverage/countries/${currentCountry}?lastdays=${days}&fullData=false`:
			`https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=${days}&fullData=false`

			await fetch(url)
			.then(response => response.json())
			.then(data => {
				const vaccine = currentCountry === 'worldWide'? { vaccination: data } : { vaccination: data.timeline }
				setVaccinationData(vaccine)
			})
		}

		getHistorical()
		getCurrentCountryData()
		getVaccinationHistorical()
	}, [currentCountry, days])
	
	const backgroundColor = {
		cases: 'rgba( 231, 16, 16, 0.10 )',
		recovered: 'rgba( 16, 180, 16, 0.10 )',
		deaths: 'rgba( 50, 120, 120, 0.10 )',
		vaccination:'rgba( 16, 180, 16, 0.10 )',
	}


	const changeCountry = (e) => setCurrentCountry(e.target.value)
	const changeDays = (e) => setDays(e.target.value)
	const changeType = (e) => {
		setType(e.target.value);
		SetGraphBackground(backgroundColor[`${e.target.value}`])
	}

	const changeCurrentState = (e) => {
		setCurrentState(e.target.value)
		setCurrentDistrict(0)
	}
	const changeCurrentDistrict = (e) => setCurrentDistrict(e.target.value)

	return (
		<div className="app">
			<div className="app-upper-section">
				<div className="container">
					<div className="header-section">
						<Header 
							currentCountry={ currentCountry } 
							changeCountry={changeCountry} 
							allCountries={allCountries} 
						/>
					</div>
					<div className="table-section">
							<Tables data={allCountries} />
					</div>
					<div className="stats-section">
						<div className="stats-container">
							<Stats 
								color='total-cases' 
								text='Total Cases' 
								currentData={currentCountryData.todayCases} 
								totalData={currentCountryData.cases} 
							/>
						</div>
						<div className="stats-container">
							<Stats 
								color='active-cases' 
								text='Active Cases' 
								currentData={currentCountryData.active} 
							/>
						</div>
						<div className="stats-container">
							<Stats 
								color='recovered' 
								text='Recovered' 
								currentData={currentCountryData.todayRecovered} 
								totalData={currentCountryData.recovered}
							/>
						</div>
						<div className="stats-container">
							<Stats 
								color='deaths' 
								text='Deaths' 
								currentData={currentCountryData.todayDeaths} 
								totalData={currentCountryData.deaths}
							/>
						</div>
					</div>
					
					<div className="graph-section">
						<GraphSection 
							text={'Graphical Representation'} 
							days={days} 
							changeDays={changeDays} 
							type={type} 
							changeType={changeType} 
							numberOfDays={numberOfDays} 
							historicalData={type==='vaccination'? vaccinationData: historicalData} 
							graphBackground={graphBackground} 
						/>
					</div>
					
					<div className="map-container">
						<Map 
							countries={allCountries} 
							casesType={type === 'vaccination'? 'recovered': type}
							center={mapCenter}
						/>
					</div>
				</div>
			</div>
			<div className="app-lower-section">
				<IndiaSection  
					data={dwhd} 
					stateDistrictList={sadnl} 
					state={currentState}
					district={currentDistrict}
					changeState={changeCurrentState}
					changeDistrict={changeCurrentDistrict}
					type={type}
					changeType={changeType}
					days={days}
					changeDays={changeDays}
					numberOfDays={numberOfDays}
					stateData={swd}
				/>
			</div>
			<Footer />
		</div>
	);
}

export default App;