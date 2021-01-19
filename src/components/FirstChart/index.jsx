import React, { Component } from 'react';
import * as d3 from 'd3';

class FirstChar extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const data = [12, 36, 27, 31, 25, 35, 1];

    const w = 500;
    const h = 400;

    const accessToRef = d3
      .select(this.myRef.current)
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('background-color', '#ccc')
      .style('padding', 10)
      .style('margin-left', 50);

    accessToRef
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => h - 10 * d)
      .attr('width', 65)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'tomato');
  }

  render() {
    return <div ref={this.myRef}></div>;
  }
}
export default FirstChar;
