

const winner = (board, player, WINNING_COMBINATIONS) => {
    for (const comb of WINNING_COMBINATIONS) {
        let [a, b, c] = comb
        if (board[a] && board[a] === player && board[a] === board[b] && board[a] === board[c]) {
            return true
        }
    }
    return false
}

const minimax = (board, player, PLAYER_X, PLAYER_O, WINNING_COMBINATIONS) => {
    if (winner(board, PLAYER_X, WINNING_COMBINATIONS)) return {score: 10}
    if (winner(board, PLAYER_O, WINNING_COMBINATIONS)) return {score: -10}
    if (board.every(tile => tile !== null)) return {score: 0}
    
    const boardCopy = [...board]
    const emptyIdx = boardCopy.reduce((acc, tile, idx) => {
      if (tile === null) {
        acc.push(idx)
      }
      return acc
    }, [])
    
    const otherPlayer = (player === PLAYER_X) ? PLAYER_O : PLAYER_X
    const moves = []
    for (const num of emptyIdx) {
      boardCopy[num] = player
      const result = minimax(boardCopy, otherPlayer, PLAYER_X, PLAYER_O, WINNING_COMBINATIONS)
      result.idx = num
      moves.push(result)
      boardCopy[num] = null
    }
    
    let bestMove = null
    if (player === PLAYER_X) {
      let bestScore = -Infinity
      for (const move of moves) {
        if (move.score > bestScore) {
          bestScore = move.score
          bestMove = move
        }
      }
    }
    else {
      let bestScore = Infinity
      for (const move of moves) {
        if (move.score < bestScore) {
          bestScore = move.score
          bestMove = move
        }
      }
    }
    
    // console.log(player, 'move: index', bestMove.idx, 'score', bestMove.score )
    return bestMove
}

export {minimax}
