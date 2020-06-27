import * as Util  from "./boardsUtils.js" ;


const renderClosedBoards = () => {
    const boards = Util.getClosedBoards();
    boards.forEach(Util.drawClosedBoard);
    Util.closedBoardListeners();
}

window.addEventListener('load', e => {
    renderClosedBoards();
})


