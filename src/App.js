import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, CardContent } from "@material-ui/core";
import InfoBox from "./components/InfoBox/InfoBox";
import Table from "./components/Table/Table";
import { sortData } from "./utils/util";
import numeral from "numeral";
import image from "./images/image.png";
import Chart from "./components/Chart/Chart";
import LineChart from "./components/LineChart/LineChart";
import Flag from "react-world-flags";

const news = [
  { tag: "OMS · 06 AGO 2026", title: "El riesgo global de COVID-19 se mantiene moderado", text: "El virus continúa circulando y requiere vigilancia constante, especialmente en grupos de mayor riesgo.", url: "https://www.who.int/publications/m/item/covid-19-global-risk-assessment--version-10" },
  { tag: "OMS · DATOS GLOBALES", title: "La vigilancia se integra con otros virus respiratorios", text: "La OMS recomienda combinar datos clínicos, de laboratorio y aguas residuales para seguir la circulación.", url: "https://data.who.int/dashboards/covid19/circulation" },
  { tag: "OMS · VACUNACIÓN", title: "Actualización de la composición de vacunas COVID-19", text: "Revisa las recomendaciones y actualizaciones técnicas sobre la composición de las vacunas.", url: "https://www.who.int/health-topics/coronavirus/covid-19-vaccines" },
];

function App() {
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("https://disease.sh/v3/covid-19/countries/CL?yesterday=30&strict=true").then((r) => r.json()),
      fetch("https://disease.sh/v3/covid-19/countries").then((r) => r.json()),
      fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries/Chile?lastdays=30&fullData=true").then((r) => r.json()),
    ]).then(([country, countries, vaccine]) => {
      setCountryInfo(country); setTableData(sortData(countries)); setVaccines(vaccine.timeline || []);
    }).catch(() => setError(true)).finally(() => setLoading(false));
  }, []);

  const value = (number) => loading ? "—" : numeral(number || 0).format("0,0");
  return (
    <div className="app">
      <nav className="topbar"><a className="brand" href="#inicio"><span className="brand__mark">+</span> Pulso COVID</a><div className="navlinks"><a href="#resumen">Resumen</a><a href="#vacunacion">Vacunación</a><a href="#noticias">Noticias</a></div></nav>
      <main>
        <section className="hero" id="inicio"><div className="hero__copy"><p className="eyebrow">MONITOREO EN TIEMPO REAL · CHILE <Flag code="CL" height="16" /></p><h1>Entender los datos también es <em>cuidarnos.</em></h1><p className="hero__lead">Una vista simple y actualizada del estado de COVID-19 para tomar decisiones informadas.</p><div className="hero__meta"><span className="live-dot" /> Datos actualizados desde <a href="https://disease.sh" target="_blank" rel="noopener noreferrer">disease.sh</a></div></div><img className="image" src={image} alt="Ilustración de monitoreo de COVID-19" /></section>
        {error && <div className="notice notice--error">No pudimos actualizar los datos ahora. Intenta recargar la página.</div>}
        <section id="resumen"><div className="section-heading"><div><p className="eyebrow">PANORAMA NACIONAL</p><h2>Resumen de Chile</h2></div><span className="date-pill">Últimos datos disponibles</span></div><div className="app__stats"><InfoBox title="Casos activos" colorCard="infoBox--purple" colorCases="infoBox__cases--purple" text="registrados recientemente" info="casos acumulados" cases={countryInfo.active} total={value(countryInfo.cases)} /><InfoBox title="Casos críticos" colorCard="infoBox--red" colorCases="infoBox__cases--red" text="requieren seguimiento" info="muertes acumuladas" cases={countryInfo.critical} total={value(countryInfo.deaths)} /></div><Card className="panel"><CardContent><h3>Distribución de casos acumulados</h3><Chart confirmed={countryInfo.cases} recovered={countryInfo.recovered} deaths={countryInfo.deaths} /></CardContent></Card></section>
        <section id="vacunacion" className="panel chart-panel"><div className="section-heading"><div><p className="eyebrow">PREVENCIÓN</p><h2>Vacunación</h2></div><span className="chart-note">Chile · últimos 30 días</span></div><LineChart vaccines={vaccines} /></section>
        <section className="panel countries"><div className="section-heading"><div><p className="eyebrow">COMPARATIVA GLOBAL</p><h2>Casos por país</h2></div></div><Table countries={tableData} /></section>
        <section id="noticias" className="news-section"><div className="section-heading"><div><p className="eyebrow">MANTENTE INFORMADO</p><h2>Noticias destacadas</h2></div><a className="text-link" href="https://www.who.int/news-room" target="_blank" rel="noopener noreferrer">Ver sala de prensa →</a></div><div className="news-grid">{news.map((item) => <a className="news-card" href={item.url} target="_blank" rel="noopener noreferrer" key={item.title}><p className="news-card__tag">{item.tag}</p><h3>{item.title}</h3><p>{item.text}</p><span>Leer fuente oficial ↗</span></a>)}</div></section>
      </main><footer><span>© {new Date().getFullYear()} Pulso COVID</span><span>Información orientativa · Consulta siempre fuentes sanitarias oficiales.</span></footer>
    </div>
  );
}
export default App;
