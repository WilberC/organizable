// import {currentHtmlName as htmlName} from './utils/current_html_name.js'
// console.log(htmlName())
import {renderMenu} from "./utils/render_nav_menu.js";

document.getElementsByTagName('body')[0].innerHTML = renderMenu
console.log(renderMenu)