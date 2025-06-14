import './CSS/App.css';
import films from './data.js';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">
      <h1>Статистика по фильмам</h1>
      <Table data={films} amountRows={15} />
    </div>
  );
}

export default App;