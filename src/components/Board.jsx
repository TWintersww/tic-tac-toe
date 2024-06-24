import Tile from "./Tile"

const Board = ({playerTurn, tiles, winningTiles, onTileClick}) => {


    return (
        <div className='board'>
            {tiles.map((tile, idx) => (
                <Tile 
                    key={idx}
                    playerTurn={playerTurn}
                    onClick={() => onTileClick(idx)}
                    value={tile}
                    className={`tile ${idx < 6 ? 'bottom-border' : ''} ${idx % 3 != 2 ? 'right-border' : ''} ${(winningTiles && winningTiles.includes(idx)) ? 'winning-tile' : ''}`}
                />

            ))}
        </div>
    )
}

export default Board
