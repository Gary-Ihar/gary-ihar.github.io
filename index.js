const getSelector = selectorName => document.querySelector(selectorName);
const prodURL = 'ws://app-list-server.herokuapp.com'; // prod
const localHost = 'ws://localhost:80'; // dev
const ul = getSelector('.list-section__list');
const productName = getSelector('input[name="product"]');
const productQnty = getSelector('input[name="qnty"]');
const btnSendForm = getSelector('#sendForm');
const btnClearList = getSelector('#clearList');
const statusIndicator = getSelector('.status_indicator');

const actions = { // as backend
    ADD_ITEM: "ADD_ITEM",
    REMOVE_ITEM: "REMOVE_ITEM",
    EDIT_ITEM: "EDIT_ITEM",
    CLEAR_LIST: "CLEAR_LIST",
};

let socketIsOpen = false;

const socket = new WebSocket(prodURL);

socket.onopen = function() {
    socketIsOpen = true;
    setOnlineStatus(socketIsOpen);
    socket.send(JSON.stringify('init'));
};

socket.onclose = function() {
    socketIsOpen = false;
    setOnlineStatus(socketIsOpen);
};
  
socket.onerror = function() {
    socketIsOpen = false;
    setOnlineStatus(socketIsOpen);
};

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    liCreator(data);
};

btnSendForm.addEventListener('click', (event) => {
    event.preventDefault();
    if(socketIsOpen) {
        const data = {
            productName: productName.value,
            productQnty: productQnty.value,
        };
        socket.send(configureData(actions.ADD_ITEM, data));
        productName.value = '';
        productQnty.value = '';
    }
});

btnClearList.addEventListener('click', () => {
    if(socketIsOpen) {
        socket.send(configureData(actions.CLEAR_LIST, {}));
    };
});

function setOnlineStatus(change) {
    if (change) statusIndicator.classList.add('status_on');
    else statusIndicator.classList.remove('status_on');
};

function liCreator(list) { // list - array
    ul.innerHTML = '<li class="list-section__list--item">' +
                        '<span>Продукты</span>' +
                        '<span>Количество</span>' +
                    '</li>';
    list.forEach(productItem => {
        const li = document.createElement('li');
        li.classList.add('list-section__list--item')
        const itemName = document.createElement('span');
        const itemQnty = document.createElement('span');
        itemName.innerText = productItem.productName;
        itemQnty.innerText = productItem.productQnty;
        li.append(itemName,itemQnty);
        ul.append(li);
    });
};

function configureData(action, data){
    return JSON.stringify({
        action,
        data
    })
};