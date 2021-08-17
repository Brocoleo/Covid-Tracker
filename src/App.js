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
import Flag from 'react-world-flags'

const App = () => {
  const [countryInfo, setCountryInfo] = useState({}); 
  const [tableData, setTableData] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [ setCasesType] = useState("cases");


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
    fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries/Chile?lastdays=30&fullData=true")
      .then((response) => response.json())
      .then((data) => {
        setVaccines(data.timeline);
      });
  }, []);






  return (
    <div className="app">
      <div className="app__left">
      <img className="image" src={image} alt="COVID-19" />
      
        <div className="app__header">        
        <h1> Datos recolectados por <a href='https://disease.sh' rel="noopener noreferrer" target="_blank" >Disase.sh</a> acerca del estado de la pandemia en nuestro pais <Flag code={ "CL" } height="19" /> </h1>  
        
          
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Casos de Coronavirus"
            colorCard={"infoBox--purple"}
            colorCases={"infoBox__cases--purple"}
            text={'Activos en los ultimos 30 dias'}
            info={'casos en total'}
            cases={countryInfo.active}
            total={numeral(countryInfo.cases).format('0,0')}
          />
         
         
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Criticos"
            colorCard={"infoBox--red"}
            colorCases={"infoBox__cases--red"}
            text={'Criticos en los ultimos 30 dias'}
            cases={countryInfo.critical}
            info={'muertes en total'}
            total={numeral(countryInfo.deaths).format("0,0")}
          />
        </div>
        <div className="app__vaccines">
          <LineChart  vaccines ={vaccines} />
        </div>
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
          <h3>Totalidad de casos en Chile</h3>
            <Chart confirmed={countryInfo.cases} recovered={countryInfo.recovered} deaths={countryInfo.deaths} />
            <h3>Casos registrados por paises</h3>
            <Table countries={tableData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
