import { columns } from '../data/tableColumns'

export default function Table(props) {
  const rows = props.rows
  return (
    <table className="table w-1/2 mx-auto mt-2 INTE PREVIEW">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessor}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={row.gamerTag}>
              {columns.map((column) => (
                <td className={row[column.accessor]} key={column.accessor}>
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
