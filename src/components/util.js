import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
    cases: {
      multiplier: 300,
      option: { color:"#cc1034", fillColor: "#cc1034" },
    },
    recovered: {
      multiplier: 500,
      option: { color:"#7dd71d", fillColor: "#7dd71d" },
    },
    deaths: {
      multiplier: 1500,
      option: { color:"rgba(0, 0, 0, 0.5)", fillColor: "rgba(0, 0, 0, 0.5)" }
    },
  };

export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const showDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={casesTypeColors[casesType].option}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));


export const getFill = (stateData, state, type) => {
  let opacity = (stateData[state][type][stateData[state][type].length -1] - stateData[state][type][stateData[state][type].length -2]) / 1000 + 0.2
  const bc = {
    cases: `rgba(255, 0, 0, ${opacity})`,
    recovered: `rgba(0, 250, 0, ${opacity})`,
    deaths: `rgba(0, 0, 0, ${opacity})`
  }

  return bc[type]
}