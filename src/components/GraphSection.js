import {
    FormControl,
    Select,
    MenuItem,
    createTheme,
    ThemeProvider,
} from '@material-ui/core'
import './GraphSection.css'
import Graph from './Graph'

const GraphSection = ({text, days, changeDays, type, changeType, numberOfDays, historicalData, graphBackground}) => {

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'light',
        },
    });

    return (
        <div className="graph">
            <div className="dropdown-container">
                <h1> {text} </h1>
                <ThemeProvider theme={darkTheme}>
                    <FormControl className="type-select">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={days}
                            onChange={changeDays}
                        >
                            <MenuItem value={numberOfDays()}>  <span className="drop-down-value">All time</span> </MenuItem>
                            <MenuItem value={183}>  <span className="drop-down-value">6 months</span> </MenuItem>
                            <MenuItem value={90}>  <span className="drop-down-value">3 months</span> </MenuItem>
                            <MenuItem value={31}> <span className="drop-down-value">30 days</span> </MenuItem>
                            <MenuItem value={15}> <span className="drop-down-value">2 weeks</span> </MenuItem>
                            <MenuItem value={8}> <span className="drop-down-value">1 week</span> </MenuItem>
                        </Select>
                    </FormControl>
                </ThemeProvider>
            
                { changeType !== null? (
                    <ThemeProvider theme={darkTheme}>
                        <FormControl className="type-select">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                onChange={changeType}
                            >
                                <MenuItem value={'cases'}>  <span className="drop-down-value">Cases</span> </MenuItem>
                                <MenuItem value={'recovered'}> <span className="drop-down-value">Recovered</span> </MenuItem>
                                <MenuItem value={'deaths'}> <span className="drop-down-value">Deaths</span> </MenuItem>
                                <MenuItem value={'vaccination'}> <span className="drop-down-value">Vaccination</span> </MenuItem>
                            </Select>
                        </FormControl>
                    </ThemeProvider>
                ) : ''}

            </div>
				
            <Graph data={historicalData} type={type} background={graphBackground} />
        </div>
    )
}

export default GraphSection
