const temperature = document.querySelector('.TEMPERATURE');
const humidity = document.querySelector('.HUMIDITY');
const heat_index = document.querySelector('.HI');
const discomfort_level = document.querySelector('.DL');

let randomTemp = [];
let randomHumid = [];
function dl(T, UR) { // Discomfort Level
  let tdi = T - (0.55 - 0.0055 * UR) * (T - 14.5);
  if (tdi < 21) {
    return 5;
  }
  else if (tdi >= 21 && tdi < 25) {
    return 4;
  }
  else if (tdi >= 25 && tdi < 28) {
    return 3;
  }
  else if (tdi >= 28 && tdi < 30) {
    return 2;
  }
  else if (tdi >= 30 && tdi < 32) {
    return 1;
  }
  return 0;
}

function hi(T, UR){
  return -8.7846947 + 1.6113941*T + 2.3385488*UR - 0.14611605*T*UR - 0.012308*T*T - 0.016424*UR*UR + 0.002211*T*T*UR + 0.000725*T*UR*UR - 0.000003582*T*T*UR*UR;
}


// API Integration

const url = "http://qts.iitkgp.ac.in/last/shm/100";

const wData = fetch(url, {method: "GET", headers:{"Content-Type": "application/json"}, mode:"no-cors"})
  .then(response=> response.json())
  .then(data => {
    data.forEach(element => {
      const T = element.Temperature;
      const H = element.Humidity;
      temperature.innerHTML = `${T}°C`;
      humidity.innerHTML = `${H}%`;
      heat_index.innerHTML=`${Math.round(hi(T, H))}°C`;
      discomfort_level.innerHTML=`${dl(T, H)}`;

    
    });
    console.log(data);
  })
  
  .catch(error => console.error("err",error));




// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if(!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if(sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}


// // ---------- CHARTS ----------

let minT = 22;
let maxT = 36;

for (let i = 0; i < 24; i++) {
  randomTemp.push(28.1);
}

let minH = 0;
let maxH = 100;


for (let i = 0; i < 24; i++) {
  randomHumid.push(42.4);
}


// var areaChartOptions1 = {
//   series: [{
//     name: 'Temperature',
//     data: randomTemp,
//   }],
//   chart: {
//     height: 350,
//     type: 'area',
//     toolbar: {
//       show: false,
//     },
//   },

//   colors: ["#4f35a1"],
//   dataLabels: {
//     enabled: true,
//   },
//   stroke: {
//     curve: 'smooth'
//   },
//   labels: ["4:30", "5:30", "6:30", "7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30", "23:30", "00:30", "1:30", "2:30", "3:30"],
//   markers: {
//     size: 0
//   },
//   yaxis: [
//     {
//       title:{
//         text: 'Temperature',
//       },
//     },
    
//   ],
  
//   tooltip: {
//     shared: true,
//     intersect: false,
//   }
// };


// var areaChart = new ApexCharts(document.querySelector("#area-chart1"), areaChartOptions1);
// areaChart.render();



var areaChartOptions2 = {
  series: [{
    name: 'Humidity',
    data: randomHumid,
  }],
  chart: {
    height: 350,
    type: 'area',
    toolbar: {
      show: false,
    },
  },

  colors: ["#246dec"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth'
  },
  labels: ["4:30", "5:30", "6:30", "7:30", "8:30", "9:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30", "23:30", "00:30", "1:30", "2:30", "3:30"],
  markers: {
    size: 0
  },
  yaxis: [
    {
      title:{
        text: 'Humidity',
      },
    },
    
  ],
  
  tooltip: {
    shared: true,
    intersect: false,
  }
};


var areaChart2 = new ApexCharts(document.querySelector("#area-chart2"), areaChartOptions2);
areaChart2.render();



async function fetchTemperatureData() {
  const response = await fetch("http://qts.iitkgp.ac.in/last/shm/100");
  const data = await response.json();
  return data.map(item => ({ x: new Date(0), y: item.Temperature }));
}
let temperatureD = [];
async function renderChart() {
  const temperatureData = await fetchTemperatureData();
  temperatureD.push(temperatureD);

  const options = {
    chart: {
      type: "area",
      height: "100%",
      width: "100%"
    },
    series: [
      {
        name: "Temperature",
        data: temperatureData
      }
    ],
    xaxis: {
      type: "datetime",
      title: {
        text: "Time"
      }
    },
    yaxis: {
      title: {
        text: "Temperature"
      }
    }
  };

  const chart = new ApexCharts(document.querySelector("#area-chart1"), options);
  chart.render();
}

renderChart();