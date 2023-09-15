import { Chart } from "$fresh_charts/mod.ts";

const chartlabels = ['PLM', 'ERP', 'MES', 'SCADA', 'PLC', 'DCS', 'Other software', 'Robotics', 'Machine Vision', 'Sensors', 'Relays & Switches', 'Motors & Drives', 'Other']
const chartdata = [21, 14, 4, 13, 5, 9, 3, 5, 5, 6, 3, 11, 1]
const bordercolor = [
  'rgba(255, 99, 132, 1)',  
  'rgba(54, 162, 235, 1)',  
  'rgba(255, 206, 86, 1)',  
  'rgba(75, 192, 192, 1)',  
  'rgba(153, 102, 255, 1)',  
  'rgba(255, 159, 64, 1)',  
  'rgba(255, 99, 132, 1)',  
  'rgba(54, 162, 235, 1)',  
  'rgba(255, 206, 86, 1)',  
  'rgba(75, 192, 192, 1)',  
  'rgba(153, 102, 255, 1)',  
  'rgba(255, 159, 64, 1)',  
  'rgba(75, 192, 192, 1)'
]
const backgroundcolor = [
  'rgba(255, 99, 132, 0.2)',  
  'rgba(54, 162, 235, 0.2)',  
  'rgba(255, 206, 86, 0.2)',  
  'rgba(75, 192, 192, 0.2)',  
  'rgba(153, 102, 255, 0.2)',  
  'rgba(255, 159, 64, 0.2)',  
  'rgba(255, 99, 132, 0.2)',  
  'rgba(54, 162, 235, 0.2)',  
  'rgba(255, 206, 86, 0.2)',  
  'rgba(75, 192, 192, 0.2)',  
  'rgba(153, 102, 255, 0.2)',  
  'rgba(255, 159, 64, 0.2)',  
  'rgba(75, 192, 192, 0.2)'
]

export default function PieChart() {
  return (
    <>
      <p>Global Automation Market By Product</p>
                <Chart
          type="pie"
          options={{
            devicePixelRatio: 1,
          }}
          data={{
            labels: chartlabels,
            datasets: [{
              label: "Sessions",
              data: chartdata,
              borderColor: bordercolor, 
              backgroundColor: backgroundcolor,
              borderWidth: 1,
            }],
          }}
        />
    </>
  )
}