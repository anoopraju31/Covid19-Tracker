import {
    FormControl,
    Select,
    MenuItem
} from '@material-ui/core'

import './Header.css'

const Header = ({currentCountry, changeCountry, allCountries}) => {
    return (
        <div className="header">
            <h1> Covid'19 Tracker </h1>
            <div className="country-dropdown">
                <FormControl className="type-select">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentCountry}
                        onChange={changeCountry}
                    >
                        <MenuItem value={'worldWide'}> <span className="drop-down-first-value">World Wide</span> </MenuItem>
                        { allCountries.map((country, index) => <MenuItem value={country.country } key={index}> <span className="drop-down-value">{country.country}</span> </MenuItem>) 
                        }	
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default Header
