import BoardsUtils  from "./boardsUtils.js" ;

// language=HTML
const boardTemplate = `
        <div class="boards__tiles__tile :color:"><p class="boards__tiles__tile__title" data-id="board-:id:">:title:</p>
            <div class="boards__tiles__tile__hover_content">
                <div class="boards__tile__tile__hover_content__icons" data-id=":id:">
                    <button class="button__close_board" title="Close Board"><img src="src/img/icons/delete.png" alt=""/>
                    </button>
                    <button class="button__star_board" title="Star Board"><img src="src/img/icons/open.png" alt=""/>
                    </button>
                </div>
            </div>
        </div>  `;


