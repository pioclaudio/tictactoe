const gameState = {
    "WIN": 0,
    "LOSS": 1,
    "DRAW": 2,
    "PLAY": 3,
    "GAME OVER": 4
}
const gameStateText = {
    0: "WIN",
    1: "LOSS",
    2: "DRAW",
    3: "PLAY",
    4: "GAME OVER"
}

const gameBoard = (() => {
    let symbol = { '-1':'\u00D7', '0':'', '1':'\u25CB' }
    let straight = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    let turn = 0;
    let cell = [0,0,0, 0,0,0, 0,0,0];
    let gameOver = false;

    const reset = () => {
        gameOver = false;
        turn = 0;
        cell = [0,0,0, 0,0,0, 0,0,0];
        for (let i=0; i<9; i++)
            document.querySelector('#item'+i).classList.remove("highlight");
    };

    let clickedLoc = -1;
    const getClickedLoc = () => clickedLoc;

    const render = () => {
        for (let i=0; i<cell.length; i++)
            document.querySelector('#item'+i).innerHTML = symbol[cell[i]];
    }


    const checkState = () => {
        if (gameOver)
            return [gameState["GAME OVER"]];

        for (s of straight) {
            let sum = cell[s[0]] + cell[s[1]] + cell[s[2]];
            if (Math.abs(sum)==3) {
                for (item in s)
                    document.querySelector('#item'+s[item]).classList.add("highlight");
                gameOver = true;
                return [gameState.WIN, cell[s[0]]];
            }
        }


        if (turn > 8) {
            gameOver = true;
            return [gameState.DRAW];
        }
        return [gameState.PLAY];
    };


    const placePiece = (p, loc) => {
        let pieceAtLoc = cell[loc];
        if (pieceAtLoc == playerPiece.blank) {
            turn++;
            cell[loc] = p;
            clickedLoc = -1;
            return moveState.SUCCESS;
        }
        return moveState.FAIL;
    };

    const gridClickedEvent = (e) => {
        clickedLoc = e.target.id.slice(4);
        displayController.processTurn();
    }

    return {checkState, placePiece, reset, render, gridClickedEvent, getClickedLoc};
})(); 