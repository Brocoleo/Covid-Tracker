import React from 'react';
import { Line } from 'react-chartjs-2';  


function LineChart({ vaccines })  {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const fechas = vaccines.slice(1,27)
  const data = {
    labels: fechas.map((data) => data.date) ,
    datasets: [
      {
        label: 'Vacunas aplicadas',
        data: vaccines.map((data) => data.daily),
        fill: true,
        backgroundColor: 'rgba(127, 200, 169, 0.2)',
        borderColor: 'rgb(127, 200, 169)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        lineTension: 0.1,
      },
    ],
  };

  
return (
  <>
    <div className='header'>
      <h1 className='title'>Vacunas Suministradas</h1>
      <div className='links'>
       
      </div>
    </div>
    <Line data={data}  options={options}/>
  </>
  )
}

export default LineChart;