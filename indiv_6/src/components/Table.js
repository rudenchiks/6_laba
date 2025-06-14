import { useState } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';
import Chart from './Chart.js';

const Table = ({ data, amountRows }) => {
  const [activePage, setActivePage] = useState(1);
  const [dataTable, setDataTable] = useState(data);
  const [sortConfig, setSortConfig] = useState([
    { level: -1, desc: false },
    { level: -1, desc: false },
    { level: -1, desc: false }
  ]);

  const updateDataTable = (filteredData) => {
    setDataTable(filteredData);
    setActivePage(1);
  };

  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig);
    let sortedData = [...dataTable];

    sortedData.sort((a, b) => {
      for (const sort of newSortConfig) {
        if (sort.level === -1) continue;
        const keys = Object.keys(data[0]);
        const key = keys[sort.level];
        const valueA = a[key];
        const valueB = b[key];

        const isNumber = typeof valueA === 'number';
        let comparison;

        if (isNumber) {
          comparison = valueA - valueB;
        } else {
          comparison = valueA.localeCompare(valueB);
        }

        if (comparison !== 0) {
          return sort.desc ? -comparison : comparison;
        }
      }
      return 0;
    });

    setDataTable(sortedData);
  };

  const totalPages = Math.ceil(dataTable.length / amountRows);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const changeActive = (event) => {
    const selectedPage = parseInt(event.target.innerHTML, 10);
    setActivePage(selectedPage);
  };

  const pages = pageNumbers.map((item) => (
    <span
      key={item}
      onClick={changeActive}
      className={`page-number ${item === activePage ? 'active' : ''}`}
      style={{ cursor: 'pointer', margin: '0 5px' }}
    >
      {item}
    </span>
  ));

  return (
    <>
      <Chart data={dataTable} />
      <h3>Фильтры</h3>
      <Filter
        filtering={updateDataTable}
        data={dataTable}
        fullData={data}
      />
      <h3>Сортировка</h3>
      <Sort sortConfig={sortConfig} setSortConfig={handleSort} />
      <table>
        <TableHead head={Object.keys(data[0])} />
        <TableBody
          body={dataTable}
          amountRows={amountRows}
          numPage={activePage}
        />
      </table>
      {totalPages > 1 && (
        <div className="pagination">{pages}</div>
      )}
    </>
  );
};

export default Table;