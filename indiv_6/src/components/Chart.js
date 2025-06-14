import { useState } from 'react';
import ChartDraw from './ChartDraw';
import * as d3 from 'd3';

const Chart = ({ data }) => {
  const [ox, setOx] = useState('Рейтинг');
  const [oy, setOy] = useState([true, false]); 
  const [chartType, setChartType] = useState('scatter');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    setOx(form['ox'].value);
    setOy([form['oy'][0].checked, form['oy'][1].checked]);
    setChartType(form['chartType'].value);

    if (!form['oy'][0].checked && !form['oy'][1].checked) {
      setError('Выберите хотя бы одно значение для оси OY');
    } else {
      setError('');
    }
  };

//   const createArrGraph = (data, key) => {
//   const groupObj = d3.group(data, (d) => d[key]);
//   let arrGraph = [];

//   for (let entry of groupObj) {
//     let obj = { labelX: entry[0] };
//     let ratings = entry[1].map((d) => d['Рейтинг']); // Используем Рейтинг вместо Лайков
    
//     if (ratings.length > 0) {
//       if (oy[0]) obj.maxLikes = d3.max(ratings); // Здесь сохраняем как maxLikes для ChartDraw
//       if (oy[1]) obj.maxReposts = d3.min(ratings); // Здесь сохраняем как maxReposts для ChartDraw
//     }
//     arrGraph.push(obj);
//   }

//   if (key === "Стоимость") {
//     arrGraph.sort((a, b) => a.labelX - b.labelX);
//   }

//   return arrGraph;
// }

const createArrGraph = (data, key) => {
  const groupObj = d3.group(data, (d) => d[key]);
  let arrGraph = [];

  for (let entry of groupObj) {
    let obj = { labelX: entry[0] };
    let ratings = entry[1].map((d) => d['Рейтинг']);
    
    if (ratings.length > 0) {
      if (oy[0]) obj.maxLikes = d3.max(ratings);
      if (oy[1]) obj.maxReposts = d3.min(ratings);
    }
    arrGraph.push(obj);
  }

  // Сортируем по labelX (годам) в числовом порядке
  if (key === "Год") {
    arrGraph.sort((a, b) => a.labelX - b.labelX);
  } else if (key === "Стоимость") {
    arrGraph.sort((a, b) => a.labelX - b.labelX);
  }

  return arrGraph;
}

  return (
    <>
      <h3>Визуализация</h3>
      <form onSubmit={handleSubmit}>
        <p>Значение по оси OX:</p>
        <div>
          <input type="radio" name="ox" value="Год" defaultChecked={ox === 'Год'} />
          Год
          <br />
          <input type="radio" name="ox" value="Стоимость" />
          Стоимость
        </div>

        <p>Значение по оси OY:</p>
        <div>
          <input type="checkbox" name="oy" defaultChecked={oy[0]} />
          Максимальный рейтинг
          <br />
          <input type="checkbox" name="oy" />
          Минимальный рейтинг
        </div>


        <p>Тип диаграммы:</p>
        <select name="chartType" defaultValue={chartType}>
          <option value="scatter">Точечная диаграмма</option>
          <option value="bar">Гистограмма</option>
        </select>

        <p>
          <button type="submit">Построить</button>
        </p>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      {!error && (
        <ChartDraw
          data={createArrGraph(data, ox)}
          oy={oy}
          chartType={chartType}
        />
      )}
    </>
  );
};

export default Chart;