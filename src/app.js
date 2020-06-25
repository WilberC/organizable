window.addEventListener('load', () => {
    // for( let i = 0; i < 12; i++) {
    //     drawBoard(BoardElement({id: `board-${i}`, title: `BOARD ${i + 1}`, color: 'color-1'}));
    // }
    //
    const removeBoardHandler = e => {
       const tagName = e.target.localName;
       const el = tagName === 'img' ? e.target.parentElement.parentElement : e.target.parentElement;
        console.log(el.dataset.id);
    }
    drawBoards();
    addListeners('.button__star_board', 'click', removeBoardHandler);
    addColorListeners();
    createBoardListener();
    modalListeners();
});

const state = {
    lastElementId: 0
};


const getBoards = () => JSON.parse(localStorage.getItem('boards'));
const saveBoards  = boards => localStorage.setItem('boards', JSON.stringify(boards));

const saveBoard = board => {
    console.log(board)
    const localBoards = getBoards();
    if(!localBoards) return saveBoards([board]);

    localBoards.push(board);
    saveBoards(localBoards);
    // TODO: Render new Board
}


const getElement = selectors => document.querySelector(selectors);
const getElements = selectors => document.querySelectorAll(selectors);

const createBoardModal = getElement('#create_board__screen');

const clearBoardForm = () => getElement('#create_board__form__title').value = '';
const openCreateBoardModal = () => {
    changeCardFormColor('color-1');
    getElement('body').classList.add('disable_body_scroll')
    createBoardModal.style.display = 'block';
};
const closeCreateBoardModal = () => {
    getElement('body').classList.remove('disable_body_scroll')
    clearBoardForm();
    createBoardModal.style.display = 'none'
};


const createBoardHandler = e => {
    const target = e.target
    const color = target.previousElementSibling.classList.item(1);
    const title = target.previousElementSibling.firstElementChild.firstElementChild.value;
    if(title === '') return;
    board = Board(color, title);
    saveBoard(board);
    closeCreateBoardModal();
    drawBoard(BoardElement(Object.assign(board, { id: state.lastElementId })))
    state.lastElementId++;
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
const Board = (color, title, isStarred = false) => { return {color, title, isStarred} }

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

const drawBoards = () => {
    const boards = getBoards();
    const boardsLength = boards ? boards.length : 0;
    if(!boards) return;
    boards.forEach( (board, id) => {
        drawBoard(
            BoardElement(Object.assign(board, { id }))
        )
    });

    state.lastElementId = boardsLength;
}

const drawBoard = boardElement => {
    getElement('#boards__tiles').insertBefore(boardElement, getElement('.boards__tiles__create'));
}


const BoardElement = ({id, title, color}) => {
    return (
        stringToHtml(
            boardTemplate.replace(/:id:/g, id)
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
    <div class="boards__tiles__tile :color:"><p class="boards__tiles__tile__title" data-id=":id:">:title:</p>
        <div class="boards__tiles__tile__hover_content">
            <div class="boards__tile__tile__hover_content__icons" data-id=":id:">
                <button class="button__star_board"><img src="./img/icons/remove.png" alt=""/></button>
                <button><img src="./img/icons/white_star.png" alt=""/></button>
            </div>
        </div>
    </div>  `;

