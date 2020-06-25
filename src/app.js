const Id = () => {
    const lastId = state.lastElementId;
    state.updateId();
    return lastId;
};

const state = {
    lastElementId: Number(localStorage.getItem('id')) || 0,
    updateId: (id = null) => {
        state.lastElementId++;
        localStorage.setItem('id', String(state.lastElementId))
    },
};

const getBoards = () => JSON.parse(localStorage.getItem('boards'));
const saveBoards  = boards => localStorage.setItem('boards', JSON.stringify(boards));

const saveBoard = board => {
    const localBoards = getBoards();
    if(!localBoards) return saveBoards([board]);

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

const ESCHandler = e => e.keyCode === 27 ? closeCreateBoardModal() : null;
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
    const boards = getBoards();
    if(!boards) return;
    boards.filter(filterStarredBoards).forEach(drawStarredBoard);
};

const drawBoard = board => {
    const boardElement = BoardElement(board);
    getElement('#boards__tiles').insertBefore(boardElement, getElement('.boards__tiles__create'));
    starredBoardListeners();
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

const closeBoardHandler = e => {
    const id = getButtonsElementFromButtonEvent(e).dataset.id;
    console.log(id);
};
const closeBoardListeners = () => addListeners('.button__close_board', 'click', closeBoardHandler);

const removeBoard = id => {
    getElement(`[data-id=board-${id}]`).parentElement.remove();
}

const unstarBoard = index => {
    const boards = getBoards();
    const board = boards[index]
    board.isStarred = false;
    removeBoard(board.id);
    saveBoards(boards);
    drawBoard(board);
};
const starBoard = index => {
    const boards = getBoards();
    const board = boards[index]
    board.isStarred = false;
    removeBoard(board.id);
    saveBoards(boards);
    drawStarredBoard(board);
}
const starredBoardHandler = e => {
    const element = getButtonsElementFromButtonEvent(e);
    const id = element.dataset.id;
    const index = getBoards().findIndex(el => el.id == id);
    if(getButtonsElementFromButtonEvent(e).lastElementChild.classList.contains('starred')) {
        return unstarBoard(index);
    }

    starBoard(index);
};
const starredBoardListeners = () => addListeners('.button__star_board', 'click', starredBoardHandler);

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
                <button class="button__close_board" title="Close Board"><img src="./img/icons/remove.png" alt="" /></button>
                <button class="button__star_board" title="Star Board"><img src="./img/icons/white_star.png" alt="" /></button>
            </div>
        </div>
    </div>  `;


window.addEventListener('load', () => {

    drawBoards();
    drawStarredBoards();
    starredBoardListeners();
    closeBoardListeners();
    addColorListeners();
    createBoardListener();
    modalListeners();
});