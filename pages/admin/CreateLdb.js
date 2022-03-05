import { useEffect, useState } from 'react'
import { players } from '../../data/players'
import { columns } from '../../data/tableColumns'
import { pointSystem } from '../../data/pointsystem'
import Table from '../../components/Table'

export default function CreateLdb() {
  const [selectedName, setSelectedName] = useState(null)
  const [isNameSelected, setIsNameSelected] = useState(false)
  const [isPositionSelected, setIsPositionSelected] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [rows, setRows] = useState([])
  const [positions, setPositions] = useState(null)
  const [selectablePlayers, setSelectablePlayers] = useState(players)
  const [tables, setTables] = useState([])

  useEffect(() => {
    const newPositionsList = []
    let count
    for (let i = 1; i < players.length + 1; i++) {
      count = i
      newPositionsList.push(count)
    }
    setPositions(newPositionsList)
  }, [])

  function addNewTable(row) {
    // const newHeat = {
    //   name: `Heat${tables.length + 1}`,
    //   heatRow: row,
    // }
    let newTables = tables
    newTables.push({ name: `Heat-${tables.length + 1}`, heatRow: row })
    setTables(newTables)
    console.log(tables)
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    setSelectedName(name)
    // const newSelectablePlayers = selectablePlayers.filter(
    //   (player) => player !== name
    // )
    setIsNameSelected(true)
    // return (selectablePlayers = newSelectablePlayers)
  }
  const handlePositionChange = (e) => {
    const position = e.target.value
    setSelectedPosition(position)
    setIsPositionSelected(true)
  }

  let newListPlayers
  let newListPosition

  const handleSubmit = (e) => {
    e.preventDefault()
    setRows([
      ...rows,
      {
        gamerTag: selectedName,
        position: selectedPosition,
        points: getPoints(selectedPosition),
      },
    ])
    setIsPositionSelected(false)
    setIsNameSelected(false)
    setSelectedName('')
    setSelectedPosition('')
    newListPlayers = selectablePlayers.filter(
      (selPlayer) => selPlayer.gamerTag !== selectedName
    )
    newListPosition = positions.filter(
      (removePos) => removePos != selectedPosition
    )

    setSelectablePlayers(newListPlayers)
    setPositions(newListPosition)
    if (selectablePlayers.length === 1) {
      addNewTable(rows.sort((a, b) => b.points - a.points))
    }
  }
  return (
    <div className="mt-10 bg-base-100 p-8 flex-1">
      <form
        onSubmit={handleSubmit}
        className=" m-auto max-w-3xl bg-base-200 p-6 rounded-md shadow-lg mb-4"
      >
        <select
          className="select select-bordered ml-4"
          name="players"
          id="players"
          value={selectedName}
          onChange={handleNameChange}
        >
          {!isNameSelected && (
            <option>
              {selectablePlayers.length === 0 ? ' - tom - ' : 'Välj namn'}
            </option>
          )}
          {selectablePlayers.map((player) => (
            <option value={player.gamerTag} key={player.id}>
              {player.gamerTag}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered ml-4"
          name="position"
          id="postionValue"
          value={selectedPosition}
          onChange={handlePositionChange}
        >
          {!isPositionSelected && <option selected>Välj position</option>}
          {positions &&
            positions.map((position, index) => (
              <option key={index}>{position}</option>
            ))}
        </select>
        <label htmlFor="dns">
          dns
          <input
            type="checkbox"
            name="dns"
            id="dns"
            className="checkbox cursor-pointer"
          />
        </label>
        <label htmlFor="dnf">
          dns
          <input
            type="checkbox"
            name="dnf"
            id="dnf"
            className="checkbox cursor-pointer"
          />
        </label>

        <button className="btn btn-accent mx-4">Lägg till</button>
        <button className="btn mx-4 btn-secondary" disabled>
          Skapa nytt heat
        </button>
      </form>

      <table className="table w-1/2 mx-auto mt-2 PREVIEW">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows &&
            rows.map((row) => {
              return (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={row.id}>{row[column.accessor]}</td>
                  ))}
                </tr>
              )
            })}
        </tbody>
      </table>

      {tables &&
        tables.map((table) => (
          <div key={table.name} className="flex flex-col">
            <h2 className="m-auto">{table.name}</h2>
            <Table rows={table.heatRow} />
          </div>
        ))}
    </div>
  )
}

function getPoints(playerPosition) {
  playerPosition -= 1
  let point = pointSystem.points[playerPosition]
  return point
}
