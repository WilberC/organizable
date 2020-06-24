window.addEventListener('load', () => {
    for( let i = 0; i < 12; i++) {
        drawBoard(newBoard(i, `BOARD ${i + 1}`));
    }

    const removeBoardHandler = e => {
       const tagName = e.target.localName;
       const el = tagName === 'img' ? e.target.parentElement.parentElement : e.target.parentElement;
        console.log(el.dataset.id);
    }
    addListeners(getElements('.button__star_board'), 'click', removeBoardHandler)
});

const addListener = (element, event, handler) => element.addEventListener(event, handler)
const addListeners = (elements, event, handler) => elements.forEach( element => addListener(element, event, handler));

const getElement = selectors => document.querySelector(selectors);
const getElements = selectors => document.querySelectorAll(selectors);

const drawBoard = board => {

    getElement('#boards__tiles').insertBefore(board, getElement('.boards__tiles__create'));
}






const newBoard = (id, title) => {
    return stringToHtml(boardTemplate.replace(/:id:/g, id).replace(/:title:/g, title));
};


const stringToHtml = string => {
    const parent = document.createElement('div');
    parent.innerHTML = string;
    return parent.firstElementChild;
}

// language=HTML
const boardTemplate = `
    <div class="boards__tiles__tile"><p class="boards__tiles__tile__title" data-id=":id:">:title:</p>
        <div class="boards__tiles__tile__hover_content">
            <div class="boards__tile__tile__hover_content__icons" data-id=":id:">
                <button class="button__star_board"><img src="./img/icons/remove.png" alt=""/></button>
                <button><img src="./img/icons/white_star.png" alt=""/></button>
            </div>
        </div>
    </div>  `;