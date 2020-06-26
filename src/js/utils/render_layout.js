import {currentHtmlName} from './current_html_name.js'
import {formatHtmlName} from './format_html_name.js'

const mainContentDiv = document.getElementById('main-content-div')
const titleElement = document.getElementById('title-page')

let links = function generateLinks(itemsList) {
    let itemsLinks = ''
    itemsList.forEach(function (htmlName) {
        let className = (currentHtmlName() === htmlName) ? 'active-link' : ''
        let tabName = formatHtmlName(htmlName, '-')
        let id = htmlName.slice(0, (htmlName.length - 5))
        itemsLinks += `<li class="${className}"><a href="./${htmlName}" id="${id}">${tabName}</a></li>`
    })
    return itemsLinks
}

export function renderPage(itemsList) {
    mainContentDiv.innerHTML = `
                                <div class="mix-nav-main">
                                    <nav class="main-nav">
                                        <ul class="main-nav-links">
                                        ${links(itemsList)}
                                        </ul>
                                    </nav>
                                    <main class="main-content"></main>
                                </div>
                                `
    titleElement.innerText = formatHtmlName(currentHtmlName(), '-')
}