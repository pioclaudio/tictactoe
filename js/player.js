const playerType = {
    "HUMAN":0,
    "CPU":1
}
const playerPiece = {
    "X": -1,
    "blank": 0,
    "O": 1,
}
const moveState = {
    "FAIL": 0,
    "SUCCESS": 1 
}
const playerPieceText = {
    "-1": "X",
    "1": "O"
}

const Player = (name, type, piece) => {
    const getType = () => type;
    const getName  = () => name;
    const getPiece = () => piece;

    shuffle = (n) => {
        let array = [...Array(n).keys()]
        for(let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array;
    }

    const performMove = () => {
        let state;
        if (type == playerType.CPU)
            state = computeMove();
        else {
            let loc = gameBoard.getClickedLoc();
            state = setMove(piece, loc);
        }
        return state;
    }

    const computeMove = () => {
        let array = shuffle(9);
        for (let loc of array) {
            let state = setMove(piece, loc);
            if (state == moveState.SUCCESS)
                return state;
        }
    }

    const setMove = (piece, loc) => {
        return gameBoard.placePiece(piece, loc);
    }

    return {getName, getType, getPiece, performMove};
}