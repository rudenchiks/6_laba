import TableRow from './TableRow.js';

const TableBody = ({ body, numPage, amountRows }) => {
    const start = (numPage - 1) * amountRows;
    const end = start + Number(amountRows);
    const visibleRows = body.slice(start, end);

    return (
        <tbody>
            {visibleRows.map((item, index) => (
                <tr key={index}>
                    <TableRow row={Object.values(item)} isHead="0" />
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
