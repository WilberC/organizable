export function currentHtmlName() {
    let path = window.location.pathname;
    return path.split("/").pop()
}