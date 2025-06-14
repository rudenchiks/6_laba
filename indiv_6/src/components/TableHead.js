import TableRow from './TableRow.js';

const TableHead = ({ head }) => {
  return (
    <thead>
      <tr>
        <TableRow row={head} isHead="1" />
      </tr>
    </thead>
  );
};

export default TableHead;