import { useEffect, useState } from 'react'
import { players } from '../../data/players'
import { columns } from '../../data/tableColumns'
import { pointSystem } from '../../data/pointsystem'
import Table from '../../components/Table'

export default function CreateLdb() {
  const [selectedName, setSelectedName] = useState('välj namn')
  const [isNameSelected, setIsNameSelected] = useState(false)
  const [isPositionSelected, setIsPositionSelected] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState('välj position')
  const [rows, setRows] = useState([])
  const [positions, setPositions] = useState([])
  const [selectablePlayers, setSelectablePlayers] = useState(players)
  const [tables, setTables] = useState([])

  useEffect(() => {
    positionsList()
  }, [])

  const positionsList = () => {
    const newPositionsList = []
    let count
    for (let i = 1; i < players.length + 1; i++) {
      count = i
      newPositionsList.push(count)
    }
    return setPositions(newPositionsList)
  }

  function addNewTable(rows) {
    const newTables = [...tables]
    newTables.push({ name: `Heat-${tables.length + 1}`, heatRow: rows })
    setTables(newTables)
  }

  const handlePositionChange = (e) => {
    const position = e.target.value
    setSelectedPosition(position)
    setIsPositionSelected(true)
  }

  const handleAdd = () => {
    setRows([
      ...rows,
      {
        gamerTag: selectedName,
        position: selectedPosition,
        points: getPoints(selectedPosition),
      },
    ])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsPositionSelected(false)
    setIsNameSelected(false)
    setSelectedName('')
    setSelectedPosition('')
    const newListPlayers = selectablePlayers.filter(
      (selPlayer) => selPlayer.gamerTag !== selectedName
    )
    const newListPosition = positions.filter(
      (removePos) => removePos != selectedPosition
    )

    setSelectablePlayers(newListPlayers)
    setPositions(newListPosition)
    if (selectablePlayers.length === 1) {
      const sortedRows = rows.sort((a, b) => b.points - a.points)
      addNewTable(sortedRows)
      setSelectablePlayers(players)
      setPositions(positionsList())
      setRows([])
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
          onChange={(e) => {
            setSelectedName(e.target.value)
            setIsNameSelected(true)
          }}
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

        <button onClick={handleAdd} className="btn btn-accent mx-4">
          Lägg till
        </button>
        <button className="btn mx-4 btn-secondary" disabled>
          Skapa nytt heat
        </button>
      </form>

      {rows && <Table rows={rows} />}

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
