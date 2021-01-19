import React, { useState, useEffect, useReducer } from 'react';
import * as d3 from 'd3';

const Arc = ({ arcData, onClick }) => {
  const [radiusAdd, setRadiusAdd] = useState(0);
  const arc = d3
    .arc()
    .innerRadius(15 + radiusAdd / 2)
    .outerRadius(105 + radiusAdd);

  function mouseOver() {
    setRadiusAdd(20);
  }

  function mouseOut() {
    setRadiusAdd(0);
  }

  const { color } = arcData.data;

  return (
    <path
      d={arc(arcData)}
      fill={color}
      cursor='pointer'
      stroke='black'
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      onClick={() => onClick(arcData)}
    />
  );
};

function useDrillableData(data) {
  const initialState = { renderData: data, stack: [] };

  return useReducer((state, action) => {
    switch (action.type) {
      case 'drilldown':
        return {
          renderData: state.renderData[action.index].children,
          stack: [...state.stack, state.renderData]
        };
      case 'drillup':
        if (state.stack.length > 0) {
          return {
            renderData: state.stack.slice(-1)[0],
            stack: state.stack.slice(0, -1)
          };
        }
        return state;
      default:
        return state;
    }
  }, initialState);
}

const DrillDownPieChart = ({ data, x, y }) => {
  const [{ renderData }, dispatch] = useDrillableData(data);
  const [percentVisible, setPercentVisible] = useState(0);

  const pie = d3
    .pie()
    .value(d => d.value)
    .startAngle(0)
    .endAngle(percentVisible * Math.PI * 2);

  function drillDown({ index }) {
    dispatch({ type: 'drilldown', index });
  }

  function drillUp() {
    dispatch({ type: 'drillup' });
  }

  useEffect(() => {
    d3.selection()
      .transition('pie-reveal')
      .duration(3000)
      .tween('percentVisible', () => {
        const percentInterpolate = d3.interpolate(0, 100);
        return t => setPercentVisible(percentInterpolate(t));
      });
  }, [renderData]);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {pie(renderData).map(d => (
        <Arc arcData={d} key={d.data.id} onClick={drillDown} />
      ))}
      <circle x={0} y={0} r={15} onClick={drillUp} fill='black' />
    </g>
  );
};

export default DrillDownPieChart;
