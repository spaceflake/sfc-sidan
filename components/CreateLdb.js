import { useEffect, useState } from 'react'
import { players } from '../data/players'
import { columns } from '../data/tableColumns'
import { pointSystem } from '../data/pointsystem'

export default function CreateLdb() {
  const [selectedName, setSelectedName] = useState({})
  const [isNameSelected, setIsNameSelected] = useState(false)
  const [isPositionSelected, setIsPositionSelected] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState({ position: 0 })
  const [rows, setRows] = useState([])
  const [positions, setPositions] = useState([1, 2, 3, 4])
  const [selectablePlayers, setSelectablePlayers] = useState(players)

  const handleNameChange = (e) => {
    console.log(selectablePlayers)
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
    setRows([...rows, { gamerTag: selectedName, position: selectedPosition }])
    setIsPositionSelected(false)
    setIsNameSelected(false)
    setSelectedName('')
    setSelectedPosition('')
    newListPlayers = selectablePlayers.filter(
      (selPlayer) => selPlayer.gamerTag !== selectedName
    )
    setSelectablePlayers(newListPlayers)
    //setPositions(newListPosition)
  }
  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit} className="m-auto w-full">
        <select
          className="select select-bordered ml-4"
          name="players"
          id="players"
          value={selectedName}
          onChange={handleNameChange}
        >
          {!isNameSelected && <option>Välj namn</option>}
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
          {!isPositionSelected && <option>Välj position</option>}
          {positions.map((position, index) => (
            <option key={index}>{position}</option>
          ))}
        </select>

        <button className="btn mx-4">Lägg till</button>
      </form>
      <table className="table w-1/2 mx-auto mt-2">
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
                  //columns.accessor = player.gamerTag
                  // player.colums.accessor
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/*
    form: 
    
 */
