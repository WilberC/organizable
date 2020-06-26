import * as Boards from "./boardsUtils.js" ;

window.addEventListener('load', () => {
    Boards.drawBoards();
    Boards.drawStarredBoards();
    Boards.starredBoardListeners();
    Boards.closeBoardListeners();
    Boards.addColorListeners();
    Boards.createBoardListener();
    Boards.modalListeners();

    // const check = () => Boards.checkEmptyStarredContainer();
});