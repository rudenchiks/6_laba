import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';

function App() {
  return (
    <div className="App">
       <h3>Самые высокие здания и сооружения</h3>
        <Table data={ buildings } amountRows="15" />
    </div>
  );
}

export default App;
