import React from "react";

export const Table = ({
  slno = false,
  rows = [],
  header = [],
  className = "",
  ...props
}) => (
  <table className={`table table-striped ${className}`} {...props}>
    <TableHeader slno={slno} header={header} />
    <TableBody slno={slno} rows={rows} header={header} />
  </table>
);

export const TableHeader = ({
  header = [],
  slno = false,
  className = "",
  ...props
}) => (
  <thead className={`thead-dark ${className}`} {...props}>
    <tr>
      {slno && <th scope="col">#</th>}
      {header.map(({ name }, key) => (
        <th scope="col" key={key}>
          {name}
        </th>
      ))}
    </tr>
  </thead>
);

export const TableRow = ({
  rowData = {},
  header = [],
  rowNum = 0,
  slno = false,
  ...props
}) => (
  <tr {...props}>
    {slno && <th scope="row">{rowNum}</th>}
    {header.map(({ field, render }, key) => (
      <td key={key}>{render ? render(rowData) : rowData[field]}</td>
    ))}
  </tr>
);

export const TableBody = ({
  rows = [],
  header = [],
  slno = false,
  ...props
}) => (
  <tbody {...props}>
    {rows.map((rowData, key) => (
      <TableRow
        key={key}
        rowData={rowData}
        header={header}
        slno={slno}
        rowNum={key + 1}
      />
    ))}
  </tbody>
);
