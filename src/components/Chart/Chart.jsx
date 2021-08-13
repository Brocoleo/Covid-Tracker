import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({confirmed,recovered,deaths}) => {

  

  const barChart = (
    confirmed ? (
      <Bar
        data={{
          labels: ['Casos', 'Recuperados', 'Muertes'],
          datasets: [
            {
              label: 'Totalidad de personas',
              data: [confirmed, recovered, deaths],
              backgroundColor: [
              'rgba(92, 82, 127, 0.2)',
              'rgba(127, 200, 169, 0.2)',
              'rgba(251, 68, 67, 0.2)',
          
            ],
            borderColor: [
              'rgba(92, 82, 127)',
              'rgba(127, 200, 169)',
              'rgba(251, 68, 67)',
          
            ],
            borderWidth: 1,
            },
          ],
        }}
        
      />
    ) : null
  );



  return (
    
    <div >
      {barChart}
    </div>
  );
};

export default Chart;