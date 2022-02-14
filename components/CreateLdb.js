import { useState } from 'react'
import { players } from '../data/players'
import { columns } from '../data/tableColumns'
import { pointSystem } from '../data/pointsystem'

export default function CreateLdb() {
  const [tablelist, setTablelist] = useState({ gamerTag: '', test: '' })

  let selectedPlayerID

  function filterID(playerId) {
    selectedPlayerID = playerId
  }

  function filterPlayer(e) {
    e.preventDefault()
    //console.log(selectedPlayerID)
    players.filter((selP) => {
      let id = `${selP.gamerTag}`
      if (id === selectedPlayerID) {
        setTablelist({ ...tablelist, gamerTag: id, test: 'test' })
      }
    })
    console.log(tablelist)
  }
  return (
    <div className="mt-10">
      <form onSubmit={filterPlayer} className="m-auto w-full">
        <select
          className="select select-bordered ml-4"
          name="players"
          id="players"
          onChange={(e) => filterID(e.target.value)}
        >
          {players.map((player) => (
            <option value={player.gamerTag} key={player.id}>
              {player.gamerTag}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered ml-4"
          name="position"
          id="postionValue"
        ></select>

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
          {players.map((player) => {
            return (
              <tr key={player.id}>
                {columns.map((column) => (
                  <td key={column.accessor}>{player[column.accessor]}</td>
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
