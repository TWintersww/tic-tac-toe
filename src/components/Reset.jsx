import GameState from "./GameState"

const Reset = ({gameState, handleReset}) => {
    if (gameState === GameState.inProgress) {
        return;
    }
    return (
        <button className="reset-button" onClick={handleReset}>Play Again!</button>
    )
}

export default Reset
