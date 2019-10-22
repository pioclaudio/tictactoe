
const displayController = (() => {
    let spaceDiv = [];
    let currentPlayer;
    let players = [];

    const gameReset = () => {
        gameBoard.reset();
        players[0] = Player("Human", playerType.HUMAN, playerPiece.O);
        players[1] = Player("CPU", playerType.CPU, playerPiece.X);
        currentPlayer = Math.floor(Math.random() * 2);
        gameBoard.render();
        setTimeout(displayController.processTurn, 500);
    }

    const initGame = () => {

        let gridItems = document.querySelectorAll(".grid-item");
        gridItems.forEach( item => {
            item.onclick = gameBoard.gridClickedEvent;
        });
        modal.init();
        gameReset();
    }

    const processTurn = () => {
        let currentGameState = gameBoard.checkState();
        if (currentGameState[0] != gameState.PLAY) {
            setTimeout( () => {endGame(currentGameState);}, 800);
        }
        else {
            if (players[currentPlayer].performMove() == moveState.FAIL)
                return;
            gameBoard.render();
            currentPlayer = (currentPlayer + 1) % 2;
            setTimeout(processTurn, 500);
        }
    }

    const endGame = (currentGameState) => {
        if (currentGameState[0] == gameState.WIN) {
            modal.setText(playerPieceText[currentGameState[1]]+" WINS!");
        } else if (currentGameState[0] == gameState.DRAW) {
            modal.setText("DRAW!");
            
        }
        modal.openModal();
    }

    return {initGame, processTurn, gameReset};
})();

displayController.initGame();
