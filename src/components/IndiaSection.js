import GraphIndia from './GraphIndia'
import IndiaMap from './IndiaMap'
import Stats from './Stats'
import './IndiaSection.css'

import {
    createTheme,
    ThemeProvider,
    FormControl,
    Select,
    MenuItem
} from '@material-ui/core'

const IndiaSection = ({data, stateDistrictList, state, district, changeState, changeDistrict, type, changeType, days, changeDays, numberOfDays, stateData}) => {

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'light',
        },
    })

    return (
        <div className="india-section">
            
            <div className="india-map-section">
               <IndiaMap stateData={stateData} stateDistrictList={stateDistrictList} state={state} type={type === 'vaccination'? 'recovered': type} />
            </div>
            <div className="india-left-section">
                <div>
                    <h1>India Section</h1>
                </div>

                <div className="stats-section">
                    <div className="stats-container">
                        <Stats color='total-cases' text='Total Cases' currentData={stateData[stateDistrictList.code[state]]['cases'][stateData[stateDistrictList.code[state]]['cases'].length -1] - stateData[stateDistrictList.code[state]]['cases'][stateData[stateDistrictList.code[state]]['cases'].length -2]} totalData={stateData[stateDistrictList.code[state]]['daily']['cases']} />
                    </div>
                    <div className="stats-container">
                        <Stats color='recovered' text='Recovered' currentData={stateData[stateDistrictList.code[state]]['recovered'][stateData[stateDistrictList.code[state]]['recovered'].length -1] - stateData[stateDistrictList.code[state]]['recovered'][stateData[stateDistrictList.code[state]]['recovered'].length -2]} totalData={stateData[stateDistrictList.code[state]]['daily']['recovered']}/>
                    </div>
                    <div className="stats-container">
                        <Stats color='deaths' text='Deaths' currentData={stateData[stateDistrictList.code[state]]['deaths'][stateData[stateDistrictList.code[state]]['deaths'].length -1] - stateData[stateDistrictList.code[state]]['deaths'][stateData[stateDistrictList.code[state]]['deaths'].length -2]} totalData={stateData[stateDistrictList.code[state]]['daily']['deaths']}/>
                    </div>
                </div>

                <div className="dropdown-container ddc">
                    <ThemeProvider theme={darkTheme}>
                        <FormControl className="type-select">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type === 'vaccination'? 'recovered': type}
                                onChange={changeType}
                            >
                                <MenuItem value={'cases'}>  <span className="drop-down-value">Cases</span> </MenuItem>
                                <MenuItem value={'recovered'}> <span className="drop-down-value">Recovered</span> </MenuItem>
                                <MenuItem value={'deaths'}> <span className="drop-down-value">Deaths</span> </MenuItem>
                                <MenuItem value={'recovered'}> <span className="drop-down-value">Vaccination</span> </MenuItem>
                            </Select>
                        </FormControl>
                    </ThemeProvider>

                    <ThemeProvider theme={darkTheme}>
                        <FormControl className="type-select">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={state}
                                onChange={changeState}
                            >
                                {
                                Object.keys(stateDistrictList['name']).map((key, index) => <MenuItem value={index} key={index}>  <span className="drop-down-value">{stateDistrictList['name'][key]}</span> </MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </ThemeProvider>

                    <ThemeProvider theme={darkTheme}>
                        <FormControl className="type-select">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={district}
                                onChange={changeDistrict}
                            >
                                {
                                    Object.keys(stateDistrictList['districts'][state]).map((key, index) => <MenuItem value={index} key={index}>  <span className="drop-down-value">{stateDistrictList['districts'][state][key]}</span> </MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </ThemeProvider>
                </div>

                <GraphIndia 
                    data={state === 0 || district=== 0? stateData :data[stateDistrictList.code[state]]['districts']} 
                    type={type === 'vaccination'? 'recovered': type} 
                    place={state === 0 || district=== 0? stateDistrictList.code[state] : stateDistrictList['districts'][state][district]} 
                />
            </div>
            <div className="india-section-state-table"></div>
        
        </div>
    )
}

export default IndiaSection
