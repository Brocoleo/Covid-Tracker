import React, {useState} from 'react';
import { Line } from 'react-chartjs-2';
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




function LineChart({ vaccines })  {
    const [dailyData, setDailyData] = useState([]);
   
    console.log(vaccines.timeline)

    
    const data = {
        labels: [],
        datasets: [
          {
            label: 'Personas vacunadas contra el covid',
            data: [1,3,4,12,41,24],
            fill: true,
            backgroundColor: 'rgba(127, 200, 169, 0.2)',
            borderColor: 'rgb(127, 200, 169)',
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
    <Line data={data} options={options} />
  </>
  )
}

export default LineChart;