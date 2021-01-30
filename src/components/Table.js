import React from 'react'

const Table = ({ className, columns, rows, format }) => {
  const makeRowKey = row => row.airline + row.src + row.dest;

  return (
    <table className={className}>
      <thead>
        <tr>
          {columns.map(({ name }) => <th key={name}>{name}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map(row =>
          <tr key={makeRowKey(row)}>
            {columns.map(({ property }) => <td key={property}>{format(property, row[property])}</td>)}
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;