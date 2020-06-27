import { starBoard, addListeners, stringToHtml } from "../boards/boardsUtils.js";
import {getElement} from "../boards/boardsUtils.js";




const Card = ({title}) => {
    return {title}
}

const CardElement = card => {
    const container = document.createElement('div')
    container.classList.add('active-column-item');
    const p = document.createElement('p');
    p.textContent = card.title;
    container.append(p)
    return container;
}

const queryParams = new URLSearchParams(window.location.search);

const starBoardHandler = e => {
    const id = queryParams.get('id');
    if(id === '') return;
    starBoard(id, true);
}

const drawCard = (card, previousSibling) => {
    previousSibling.after(CardElement(card));
}

const addCard = (title, previousSibling) => {
    drawCard(Card({title}), previousSibling)
}

const closeAddCardForm = formElement => {
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

const closeCardFormHandler = e => {
    closeAddCardForm(e.target.parentElement.parentElement.parentElement.parentElement)
}

const addCardHandler = e => {
    const input = e.target.parentElement.previousElementSibling;
    const value = input.value;
    const children = input.parentElement.previousElementSibling.parentElement.parentElement
        .previousElementSibling.parentElement.children[1].children;

    addCard(value, children[children.length - 2]) // last card in the list
    input.value = ''
}

const addListHandler = e => {
    const form = e.target.parentElement.parentElement;
    if(form.classList.contains('bg-solid')) closeAddCardForm(form);
    openAddListForm(form)
};

window.addEventListener('load', e => {

    addListeners('.star-icon','click', starBoardHandler);
    addListeners('.save-card-item-btn', 'click', addCardHandler);
    addListeners('#add_list__trigger', 'click', addListHandler)
    addListeners('#add_list__btn__close', 'click', closeCardFormHandler)

});
