import './App.css';
import DrillDownPieChart from 'components/DrillDownPieChart';
import * as d3 from 'd3';
import faker from 'faker';
import chroma from 'chroma-js';

function generateData(level, prevIndex, color) {
  console.log(level, color);
  const N = d3.randomUniform(3, 10)();
  const colors = color
    ? d3.range(N).map(i =>
        chroma(color)
          .darken(i * 0.2)
          .hex()
      )
    : d3.schemePaired;

  return d3.range(N).map(i => ({
    value: Math.abs(d3.randomNormal()()),
    id: `${level}-${i}`,
    name: faker.internet.userName(),
    index: i,
    level,
    prevIndex,
    color: colors[i],
    children: level > 0 ? generateData(level - 1, i, colors[i]) : []
  }));
}

function App() {
  const data = generateData(2);

  return (
    <>
      <h1>DrillDown Pie With React & D3</h1>
      <svg width='500' height='500'>
        <DrillDownPieChart data={data} x={250} y={150} />
      </svg>
    </>
  );
}

export default App;
