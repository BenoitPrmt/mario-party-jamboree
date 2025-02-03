export const selectRandom = (board) => {
    return board[Math.floor(Math.random() * board.length)]
}