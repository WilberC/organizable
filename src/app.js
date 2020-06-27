import * as Boards from "./js/boards/boardsUtils.js" ;

window.addEventListener('load', () => {
    Boards.drawBoards();
    Boards.drawStarredBoards();
    Boards.starredBoardListeners();
    Boards.closeBoardListeners();
    Boards.addColorListeners();
    Boards.createBoardListener();
    Boards.modalListeners();
    Boards.onClickBoardHover();

});