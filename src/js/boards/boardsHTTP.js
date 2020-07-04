const TOKEN = 'c1siLMvv7z31UUrbdSzABaWA' // TODO: cambiar esto por lo del localStorage
const URL = 'https://peaceful-inlet-99002.herokuapp.com/boards';

const GET_Boards = async () => {
    const init = { method: 'GET', headers: { 'Authorization': `Token token="${TOKEN}"` } };
    const boards = await (await fetch(URL, init)).json();
    console.log(boards)
}

