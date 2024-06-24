import { useState, useEffect } from "react"
import Board from "./Board"
import GameOver from "./GameOver"
import Reset from "./Reset"
import GameState from "./GameState"
import {minimax} from "../utils/Minimax"

let PLAYER_X = 'X'
let PLAYER_O = 'O'
let WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
]


const TicTacToe = () => {
    const [tiles, setTiles] = useState(Array(9).fill(null))
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X)
    const [winningTiles, setWinningTiles] = useState(null)
    const [gameState, setGameState] = useState(GameState.inProgress)
    // const [isComputerMove, setIsComputerMove] = useState(false)

    const handleTileClick = (idx) => {
        if (gameState !== GameState.inProgress) return
        if (tiles[idx]) return

        // console.log('change')
        const tilesCopy = [...tiles]
        tilesCopy[idx] = playerTurn
        setTiles(tilesCopy)

        setPlayerTurn(prevPlayerTurn => 
            prevPlayerTurn === PLAYER_X ? PLAYER_O : PLAYER_X)
    }
    const handleReset = () => {
        setGameState(GameState.inProgress)
        setTiles(Array(9).fill(null))
        setPlayerTurn(PLAYER_X)
        setWinningTiles(null)
        // setIsComputerMove(false)
    }
    const checkWinner = () => {
        for (const winningComb of WINNING_COMBINATIONS) {
            const [a, b, c] = [...winningComb]
            if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
                if (tiles[a] === 'X') {
                    setGameState(GameState.playerXWins);
                }
                else {
                    setGameState(GameState.playerOWins);
                }
                setWinningTiles(winningComb)
                return;
            }
        }

        const allTilesFilled = tiles.every(tile => tile !== null)
        if (allTilesFilled) {
            setGameState(GameState.draw)
        }
    }
    
    useEffect(() => {
        checkWinner()
    }, [tiles])
    useEffect(() => {
        if (playerTurn === PLAYER_O && gameState === GameState.inProgress) {
            computerMove()
        }
    }, [playerTurn, gameState])

    const computerMove = () => {
        let bestMove = minimax(tiles, playerTurn, PLAYER_X, PLAYER_O, WINNING_COMBINATIONS);
        handleTileClick(bestMove.idx)
    }

    return (
        <>
            <h1>Minimax Tic Tac Toe</h1>
            <Board playerTurn={playerTurn} tiles={tiles} winningTiles={winningTiles} onTileClick={handleTileClick}/>
            <GameOver gameState={gameState}/>
            <Reset gameState={gameState} handleReset={handleReset}/>
        </>
    )
}

export default TicTacToe
