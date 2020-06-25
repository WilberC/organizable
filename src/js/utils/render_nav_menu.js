import {currentHtmlName as htmlName} from './current_html_name.js'

console.log(htmlName())

let links = function generateLinks() {
    return `
    <li class="active-link"><a href="./my-boards.html">My boards</a></li>
    <li><a href="./closed-boards.html">Closed boards</a></li>
    <li><a href="my-profile.html">My Profile</a></li>
    <li><a href="login.html">Log out</a></li>`
}

export let renderMenu = `
<div class="mix-nav-main">
    <nav class="main-nav">
        <ul class="main-nav-links">
        ${links()}
        </ul>
    </nav>
    <main class="main-content"></main>
</div>
`
