const Id = () => {
    const lastId = state.lastElementId;
    state.updateId();
    return lastId;
};

const state = {
    lastElementId: Number(localStorage.getItem('id')) || 0,
    updateId: () => {
        state.lastElementId++;
        localStorage.setItem('id', String(state.lastElementId))
    },
};

const getBoards = () => JSON.parse(localStorage.getItem('boards')) || [];
const saveBoards  = boards => localStorage.setItem('boards', JSON.stringify(boards));

const saveBoard = board => {
    const localBoards = getBoards();
    localBoards.push(board);
    saveBoards(localBoards);
    clearBoardForm();
}

const getElement = selectors => document.querySelector(selectors);
const getElements = selectors => document.querySelectorAll(selectors);

const getCreateBoardModalElement = getElement('#create_board__screen');

const clearBoardForm = () => getElement('#create_board__form__title').value = '';
const openCreateBoardModal = () => {
    changeCardFormColor('color-1');
    getElement('body').classList.add('disable_body_scroll')
    getCreateBoardModalElement.style.display = 'block';
};
const closeCreateBoardModal = () => {
    getElement('body').classList.remove('disable_body_scroll')
    getCreateBoardModalElement.style.display = 'none'
};


const createBoardHandler = e => {
    const target = e.target
    const color = target.previousElementSibling.classList.item(1);
    const title = target.previousElementSibling.firstElementChild.firstElementChild.value;
    if(title === '') return;
    const board = Board(color, title);
    saveBoard(board);
    closeCreateBoardModal();
    drawBoard(board)
}
const createBoardListener = () => addListener('#btn-create-board', 'click', createBoardHandler);

const btnCloseModalListener = () => addListener('#create_board__form__close', 'click', closeCreateBoardModal)

const btnOpenModalListener = () => {
    addListener('#create-board', 'click', openCreateBoardModal)
}

const ESCHandler = e => e.key === 'Escape' ? closeCreateBoardModal() : null;
const ESCListener = () => document.addEventListener('keyup', ESCHandler);

const screenModalHandler = e => {
    const target = e.target;
    if(target.classList.contains('create_board') || target.id === 'create_board__screen') closeCreateBoardModal();
}
const screenModalListener = () => addListener('#create_board__screen', 'click', screenModalHandler);

const modalListeners = () => {
    btnCloseModalListener();
    btnOpenModalListener();
    screenModalListener();
    ESCListener();
}
const Board = (color, title, isStarred = false) => { return {id: Id(),color, title, isStarred} }

const changeCardFormColor = color => {
    getElement('.create_board__form').setAttribute('class', `create_board__form ${color}`);
};

const colorHandler = e => changeCardFormColor(e.target.classList.item(1));
const addColorListeners = () => addListeners('.create_board__colors_color', 'click', colorHandler);


const addListener = (selectors, event, handler) => {
    const element = (typeof selectors) === "string" ? document.querySelector(selectors) : selectors;
    element.addEventListener(event, handler)
}
const addListeners = (selectors, event, handler) => {
    getElements(selectors).forEach(element => addListener(element, event, handler));
}

const filterStarredBoards = board => board.isStarred;
const filterNoStarredBoards = board => !board.isStarred

// TODO: Revisar esto y ver si se puede refactorizar
const drawStarredBoards = () => {
    const boards = getBoards().filter(filterStarredBoards);
    if(boards.length === 0) return renderEmptyStarredMessage();
    boards.forEach(drawStarredBoard);
};

const drawBoard = board => {
    const boardElement = BoardElement(board);
    getElement('#boards__tiles').insertBefore(boardElement, getElement('.boards__tiles__create'));
    boardListeners();
};

const drawClosedBoard = board => {
    const boardElement = ClosedBoardElement(board);
    getElement('#boards__tiles').insertBefore(boardElement, getElement('.boards__tiles__create'));
};

const drawBoards = () => {
    const boards = getBoards();
    if(!boards) return;
    boards.filter(filterNoStarredBoards).forEach(drawBoard);
}


const drawStarredBoard = board => {
    const boardElement = StarredBoardElement(board);
    getElement('#header__starred_boards').append(boardElement);
    starredBoardListeners();
}


const getButtonsElementFromButtonEvent = e => {
    const tagName = e.target.localName;
    return tagName === 'img' ? e.target.parentElement.parentElement : e.target.parentElement;
}

const getClosedBoards = () => JSON.parse(localStorage.getItem('closedBoards')) || [];
const saveClosedBoards  = boards => localStorage.setItem('closedBoards', JSON.stringify(boards));

const closeBoard = board => {
    const localBoards = getClosedBoards();
    localBoards.push(board);
    saveClosedBoards(localBoards);
    removeBoard(board.id);
}

const closeBoardHandler = e => {
    const id = getButtonsElementFromButtonEvent(e).dataset.id;
    const localBoards = getBoards();
    const closedBoard = localBoards.find( el => String(el.id) === String(id))
    const boards = localBoards.filter(el => String(el.id) !== String(id));
    saveBoards(boards);
    closeBoard(closedBoard);
};

const boardListeners = () => {
    starredBoardListeners();
    closeBoardListeners();
}

const closedBoardListeners = () => {
    deleteBoardListeners();
    restoreBoardListeners();
}

const closeBoardListeners = () => addListeners('.button__close_board', 'click', closeBoardHandler);

const renderEmptyStarredMessage = () => {
    const msg = '<h2 id="starred-empty-message">Nothing, yet</h2>';
    getElement('#header__starred_boards').append(stringToHtml(msg));
};
const removeEmptyStarredMessage = () => {
    const msg = getElement('#starred-empty-message');
    if(!msg) return;
    msg.remove();
}

const checkEmptyStarredContainer = () => {
    const container = getElement('#header__starred_boards');
    if(container.childElementCount === 0) return renderEmptyStarredMessage();
    removeEmptyStarredMessage();
}

const removeBoard = id => {
    getElement(`[data-id=board-${id}]`).parentElement.remove();
}

const unstarBoard = index => {
    const boards = getBoards();
    const board = boards[index]
    board.isStarred = false;
    removeBoard(board.id);
    checkEmptyStarredContainer();
    saveBoards(boards);
    drawBoard(board);
    boardListeners();

};
const starBoard = index => {
    const boards = getBoards();
    const board = boards[index]
    board.isStarred = true;
    removeBoard(board.id);
    saveBoards(boards);
    removeEmptyStarredMessage();
    drawStarredBoard(board);
    boardListeners();
}
const starredBoardHandler = e => {
    const element = getButtonsElementFromButtonEvent(e);
    const id = element.dataset.id;
    const index = getBoards().findIndex(el => String(el.id) === String(id));
    if(getButtonsElementFromButtonEvent(e).lastElementChild.classList.contains('starred')) {
        return unstarBoard(index);
    }

    starBoard(index);
};

const restoreBoard = id => {
    const board = getClosedBoards().find(el => String(el.id) === String(id));
    const closedBoards = getClosedBoards().filter(el => String(el.id) !== String(id));
    saveClosedBoards(closedBoards);
    removeBoard(id);
    saveBoard(board);
};

const starredBoardListeners = () => addListeners('.button__star_board', 'click', starredBoardHandler);



const deleteBoard = id => {
    saveClosedBoards(getClosedBoards().filter(el => String(el.id) !== String(id)))
}

const deleteBoardHandler = e => {
    const element = getButtonsElementFromButtonEvent(e);
    const id = element.dataset.id;
    deleteBoard(id);
    removeBoard(id);
}

const deleteBoardListeners = () => addListeners('.button__delete_board', 'click', deleteBoardHandler);

const restoreBoardHandler = e => {
    const element = getButtonsElementFromButtonEvent(e);
    const id = element.dataset.id;
    restoreBoard(id);

};
const restoreBoardListeners = () => addListeners('.button__restore_board', 'click', restoreBoardHandler);


const BoardElement = ({id, title, color}) => {
    return (
        stringToHtml(
            boardTemplate.replace(/:id:/g, id)
                .replace(/:title:/g, title)
                .replace(/:color:/, color)
        )
    );
};

const StarredBoardElement = ({id, title, color}) => {
    const element = stringToHtml(
        boardTemplate.replace(/:id:/g, id)
            .replace(/:title:/g, title)
            .replace(/:color:/, color)
    );

    const button = element.children[1].firstElementChild.lastElementChild;
    button.classList.add('starred');
    button.setAttribute('title', 'Unstar Board');
    return element;
};

const ClosedBoardElement = ({id, title, color}) => {
    return (
        stringToHtml(
            closedBoardTemplate.replace(/:id:/g, id)
                .replace(/:title:/g, title)
                .replace(/:color:/, color)
        )
    );
};

const stringToHtml = string => {
    const parent = document.createElement('div');
    parent.innerHTML = string;
    return parent.firstElementChild;
}

// language=HTML
const boardTemplate = `
    <div class="boards__tiles__tile :color:"><p class="boards__tiles__tile__title" data-id="board-:id:">:title:</p>
        <div class="boards__tiles__tile__hover_content">
            <div class="boards__tile__tile__hover_content__icons" data-id=":id:">
                <button class="button__close_board" title="Close Board"><img src="src/img/icons/remove.png" alt="" /></button>
                <button class="button__star_board" title="Star Board"><img src="src/img/icons/white_star.png" alt="" /></button>
            </div>
        </div>
    </div>  `;

// language=HTML
const closedBoardTemplate = `
        <div class="boards__tiles__tile :color:"><p class="boards__tiles__tile__title" data-id="board-:id:">:title:</p>
            <div class="boards__tiles__tile__hover_content">
                <div class="boards__tile__tile__hover_content__icons" data-id=":id:">
                    <button class="button__delete_board" title="Delete Board"><img src="src/img/icons/delete.png" alt=""/>
                    </button>
                    <button class="button__restore_board" title="Restore Board"><img src="src/img/icons/open.png" alt=""/>
                    </button>
                </div>
            </div>
        </div>  `;

export {
    drawClosedBoard,
    drawBoards,
    drawStarredBoards,
    starredBoardListeners,
    closeBoardListeners,
    addColorListeners,
    createBoardListener,
    modalListeners,
    getClosedBoards,
    saveClosedBoards,
    closedBoardListeners
}