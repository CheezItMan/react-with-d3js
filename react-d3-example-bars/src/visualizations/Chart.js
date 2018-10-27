import React, { Component } from "react";
import * as d3 from "d3";

const width = 650;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class Chart extends Component {
  state = {
    bars: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data) return {};

    const [minAvg, maxAvg] = d3.extent(data, d => d.avg);

    const colorScale = d3.scaleSequential(d3.interpolateSpectral)
      .domain([maxAvg, minAvg]);

    const xExtent = d3.extent(data, d => d.date);
    const xScale = d3
      .scaleTime()
      .domain(xExtent)
      .range([0, width]);

    const yMin = d3.min(data, d => d.low);
    const yMax = d3.max(data, d => d.high);

    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])
      .range([height, 0]);

    const bars = data.map(d => {
      return {
        x: xScale(d.date),
        y: yScale(d.high),
        height: yScale(d.low) - yScale(d.high),
        fill: colorScale(d.avg),
      };
    });

    return {bars};
  }

  render() {
    console.log(this.state.bars);
    return (
      <svg width={width} height={height}>
        {this.state.bars.map( bar => {
          return (
          <rect 
            x={ bar.x } y={ bar.y } width={ 2 } height={ bar.height } fill={bar.fill}  />
        )}
        )
        }
    
      </svg>
    )
  }
}

export default Chart;
