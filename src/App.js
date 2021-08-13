import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox/InfoBox";

import Table from "./components/Table/Table";
import { sortData } from "./utils/util";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";
import image from './images/image.png';
import Chart from "./components/Chart/Chart";
import LineChart from "./components/LineChart/LineChart";

const App = () => {
  const [countryInfo, setCountryInfo] = useState({}); 
  const [tableData, setTableData] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries/CL?yesterday=30&strict=true")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          let sortedData = sortData(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries/CL")
      .then((response) => response.json())
      .then((data) => {
        setVaccines(data);
      });
  }, []);






  return (
    <div className="app">
      <div className="app__left">
      <img className="image" src={image} alt="COVID-19" />
        <div className="app__header">
        <h1> Chile Coronavirus tracker <Emoji symbol="🇨🇱"/></h1>   
          
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Casos de Coronavirus"
            colorCard={"infoBox--purple"}
            colorCases={"infoBox__cases--purple"}
            cases={numeral(countryInfo.todayCases).format('+0,0')}
            total={numeral(countryInfo.cases).format('0,0')}
          />
         
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recuperados"
            colorCard={"infoBox--green"}
            colorCases={"infoBox__cases--green"}
            cases={numeral(countryInfo.todayRecovered).format('+0,0')}
            total={numeral(countryInfo.recovered).format("0,0")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Muertes"
            colorCard={"infoBox--red"}
            colorCases={"infoBox__cases--red"}
            cases={numeral(countryInfo.todayDeaths).format('+0,0')}
            total={numeral(countryInfo.deaths).format("0,0")}
          />
        </div>
        <LineChart  vaccines ={vaccines} />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Casos registrados por paises</h3>
            <Table countries={tableData} />
            <h3>Totalidad de casos en Chile</h3>
            <Chart confirmed={countryInfo.cases} recovered={countryInfo.recovered} deaths={countryInfo.deaths} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;