import './App.css';
import DrillDownPieChart from 'components/DrillDownPieChart';
import data from './data';
import Chart3 from 'components/Chart3';
import Chart4 from 'components/Chart4';

function App() {
  return (
    <>
      <h1>DrillDown Pie With React & D3</h1>
      <Chart4 data={data} outerRadius={200} innerRadius={10} />
    </>
  );
}

export default App;
