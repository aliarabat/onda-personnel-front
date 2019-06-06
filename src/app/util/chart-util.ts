import Chart from "chart.js/dist/Chart";

export function ChartUtil(htmlElement: any, labels: Array<any>, data: Array<any>, title: string) {
  let myChart = new Chart(htmlElement, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: "Nombre",
        data: data,
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850"
        ]
      }]
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      title: {
        display: true,
        text: title
      }
    }
  });
}

export function doubleChart(htmlElement: any, labels: Array<any>, dataSets: Array<any>, title: string) {
  new Chart(htmlElement, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: dataSets
    },
    options: {
      hover: {
        animationDuration: 0
      },
      responsiveAnimationDuration: 0,
      title: {
        display: true,
        text: title
      }
    }
  });
}
