import { columns } from '../data/tableColumns'

export default function Table({ rows }) {
  // console.log(rows)
  return (
    <table className="table w-1/2 mx-auto mt-2">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={row.id}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  )
}
