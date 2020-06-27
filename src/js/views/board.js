import { starBoard, addListeners, stringToHtml } from "../boards/boardsUtils.js";
import {getElement} from "../boards/boardsUtils.js";

String.prototype.toHTML = function () {
    return stringToHtml(this)
}


// language=HTML
const listTemplate = `
    <div class="list-content-item active-column">
        <header class="active-column-header">
            <h2>:title:</h2>
            <img src="src/img/icons/close_colum_item.png"/>
        </header>
        <div class="active-column-items-container">
            <div class="add-card-item">
                <p class="add-card-trigger">&plus; Add another card</p>
                <div class="add-card-item__content hidden">
                    <input type="text" class="form-control card-item-input" placeholder="Enter a title for this card...">
                    <div class="save-card-item-options-group">
                        <button type="button" class="btn btn-success save-card-item-btn">Add Card</button>
                        <img class="close-add-card-form" src="src/img/icons/cancel_add_card_item.png"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;


const CardElement = card => {
    const container = document.createElement('div')
    container.classList.add('active-column-item');
    const p = document.createElement('p');
    p.textContent = card.title;
    container.append(p)
    return container;
};

const Card = ({title}) => {
    return {
        title,
        toHTML: function () {
            return CardElement(this)
        }
    }
};



const ListElement = list => {
    return listTemplate.replace(/:title:/gi, list.title).toHTML();
};

const List = function ({title}) {
    return {
        title: title,
        toHTML: function() {
            return ListElement(this)
        }
    }
    // return argumens[0]
};


const queryParams = new URLSearchParams(window.location.search);

const starBoardHandler = e => {
    const id = queryParams.get('id');
    if(id === '') return;
    starBoard(id, true);
}

const drawCard = (card, container) => {
    container.insertBefore(card.toHTML(), container.lastElementChild);
}

const addCard = (title, container) => {
    drawCard(Card({title}), container)
}

const closeAddListForm = formElement => {
    formElement.classList.toggle('bg-solid');
    formElement.firstElementChild.firstElementChild.nextElementSibling.classList.remove('add_list_show');
    showAddListTrigger();
}

const showAddListTrigger = () => getElement('#add_list__trigger').style.display = 'block'
const hideAddListTrigger = () => getElement('#add_list__trigger').style.display = 'none'

const openAddListForm = formElement => {
    formElement.classList.toggle('bg-solid');
    hideAddListTrigger();
    formElement.firstElementChild.firstElementChild.nextElementSibling.classList.add('add_list_show')
}

const closeListFormHandler = e => {
    closeAddListForm(e.target.parentElement.parentElement.parentElement.parentElement)
}

const toggleElement = element => element.classList.toggle('hidden')

const closeCardFormHandler = e => {
    e.target.parentElement.previousElementSibling.value = ''; // limpiamos el input
    toggleElement(e.target.parentElement.parentElement)
    toggleElement(e.target.parentElement.parentElement.previousElementSibling)
}

const addCardHandler = e => {
    const input = e.target.parentElement.previousElementSibling;
    const value = input.value;
    if(value === '') return;
    const cardContainer = input.parentElement.previousElementSibling.parentElement.parentElement
        .previousElementSibling.parentElement.lastElementChild;
    input.value = ''
    addCard(value, cardContainer)
}

const addCardTrigger = e => {
    toggleElement(e.target)
    toggleElement(e.target.nextElementSibling)
}

const toggleAddListFormHandler = e => {
    const form = e.target.parentElement.parentElement;
    if(form.classList.contains('bg-solid')) closeAddListForm(form);
    openAddListForm(form)
};

const drawList = (list, container) => {
    container.parentElement.insertBefore(list.toHTML(), container);
    cardsListeners();
};

const addListHandler = e => {
    const container = e.target.parentElement.parentElement.parentElement.parentElement;
    console.log(container)
    const input = container.firstElementChild.firstElementChild.nextElementSibling.firstElementChild;
    const title = input.value;
    drawList(List({title}), container)
    closeAddListForm(container)
    input.value = '';
};

const cardsListeners = () => {
    addListeners('.save-card-item-btn', 'click', addCardHandler);
    addListeners('#add_list__trigger', 'click', toggleAddListFormHandler);
    addListeners('.add-card-trigger', 'click', addCardTrigger);
    addListeners('.close-add-card-form', 'click', closeCardFormHandler);
};

window.addEventListener('load', e => {

    addListeners('.star-icon','click', starBoardHandler);
    addListeners('#add_list__btn__close', 'click', closeListFormHandler)
    addListeners('#add_list__btn', 'click', addListHandler)
    cardsListeners();

});
