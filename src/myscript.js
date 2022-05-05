const URLAPI = "http://www.mocky.io/v2/58fda6ce0f0000c40908b8c8";

var apiData = null;
var totalPages = 0;
var currentPage = -1;
const elementsPerPage = 5;

function httpGetAsync() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseApi = xmlHttp.responseText;
            var jsonParsed = JSON.parse(responseApi);
            apiData = jsonParsed.news;
            totalPages = apiData.length / 5;
            currentPage = -1;
            changePage();
        }
    }
    xmlHttp.open("GET", URLAPI, true);
    xmlHttp.send(null);
}

setInterval(
    changePage, 15000
);

setInterval(
    httpGetAsync, 180000
);

function paginate(array, pageSize, pageNumber) {
    return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
}

function changePage() {
    updateCurrentPage();
    clearPage();
    fillPage(paginate(apiData, elementsPerPage, currentPage));
    highlightPage();
}

function updateCurrentPage() {
    currentPage++;
    currentPage = currentPage % totalPages;
}

function highlightPage() {
    var activePages = document.getElementsByClassName('active');
    for (let i = 0; i < activePages.length; i++) {
        activePages[i].className="";
    }
    var activePage = document.getElementById('page-' + currentPage );
    activePage.className="active";
}

function clearPage() {
    var listContainer = document.getElementById("news-list");
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.lastChild);
    }
}

function fillPage(array) {
    var listContainer = document.getElementById("news-list");

    for (let i = 0; i < array.length; i++) {

        let h3Element = document.createElement("h3");
        h3Element.innerHTML = array[i].title;
        let pElement = document.createElement("p");
        pElement.innerHTML = array[i].details;
        listContainer.append(h3Element, pElement);

    }
}
