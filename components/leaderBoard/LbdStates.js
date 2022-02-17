import React, { useState } from "react";
import { players } from '../../data/players'

export const selectName = () => {
    const [ selectedName, setSelectedName ] = useState({})
    return [ selectedName, setSelectedName ]
}

export const checkName = () => {
    const [isNameSelected, setIsNameSelected] = useState(false)
    return [isNameSelected, setIsNameSelected]
}

export const checkPos = () => {
    const [isPositionSelected, setIsPositionSelected] = useState(false)
    return [isPositionSelected, setIsPositionSelected]
}

export const selectPosition = () => {
    const [selectedPosition, setSelectedPosition] = useState({ position: 0 })
    return [selectedPosition, setSelectedPosition]
}

export const selectRow = () => {
    const [rows, setRows] = useState([])
    return [ rows, setRows ]
}

export const setPos = () => {
    const [positions, setPositions] = useState([1, 2, 3, 4])
    return [ positions, setPositions ]
}

export const checkPlayers = () => {
    const [selectablePlayers, setSelectablePlayers] = useState(players)
    return [ selectablePlayers, setSelectablePlayers ]
}