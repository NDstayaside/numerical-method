import {React, Component} from "react";
import ReactApexChart from "react-apexcharts";
// import { Chart } from "chart.js";

class ApexChart extends Component {
    constructor(props) {
      super(props);
        console.table(props.data.datax);
        console.table(props.data.datay);
        console.table(props.data.realy);
      this.state = {
      
        series: [{
            name: "Data y",
            data: props.data.datay
          },
          {
            name: "Real y",
            data: props.data.realy
          }
        ],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            width: [5, 7, 5],
            curve: 'straight',
            dashArray: [0, 8, 5],
            // colors: ['#FB2576', '#59CE8F']
          },
          title: {
            text: 'Page Statistics',
            align: 'left'
          },
          legend: {
            tooltipHoverFormatter: function(val, opts) {
              return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
            }
          },
          markers: {
            size: 0,
            hover: {
              sizeOffset: 6
            }
          },
          xaxis: {
            categories: props.data.datax
          },
          tooltip: {
            y: [
              {
                title: {
                  formatter: function (val) {
                    return val + " (mins)"
                  }
                }
              },
              {
                title: {
                  formatter: function (val) {
                    return val + " per session"
                  }
                }
              },
              {
                title: {
                  formatter: function (val) {
                    return val;
                  }
                }
              }
            ]
          },
          grid: {
            borderColor: '#f1f1f1',
          },
          fill: {
            type: 'gradient',
          }
        },
        };
    }

  

    render() {
      return (
            <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
            </div>
        );
    }
}

export default ApexChart;