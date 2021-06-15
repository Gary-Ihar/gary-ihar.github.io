const getSelector = selectorName => document.querySelector(selectorName);
const prodURL = 'https://app-list-server.herokuapp.com'; // prod
const localHost = 'http://localhost:80'; // dev
const ul = getSelector('.list-section__list');
const productName = getSelector('input[name="product"]');
const productQnty = getSelector('input[name="qnty"]');
const btnSendForm = getSelector('#sendForm');
const btnClearList = getSelector('#clearList');

let url = prodURL;
const modeInfo = getSelector('.active_mode');
const btnChangeMode = getSelector('#change_mode');

btnChangeMode.addEventListener('click', () => {
    if (modeInfo.textContent === 'off') {
        modeInfo.textContent = 'on';
        url = localHost;
    } else {
        modeInfo.textContent = 'off';
        url = prodURL;
    }
    updateListItem();
});

btnSendForm.addEventListener('click', async (event) => {
    event.preventDefault();
    const body = {
        productName: productName.value,
        productQnty: productQnty.value,
    };
    await fetch(`${url}/list`,{
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    })
    .catch(() => {
        console.log('что-то пошло не так, элемент не добавился'); // TODO: обработать ошибку.
    })
    .finally(updateListItem)
    productName.value = '';
    productQnty.value = '';
});

btnClearList.addEventListener('click', () => {
    fetch(`${url}/clear`)
    .catch(()=>{
        console.log('что-то пошло не так, список не очистился') // TODO: обработать ошибку.
    })
    .finally(updateListItem)
})

function updateListItem() {
    fetch(`${url}/get`)    
    .then((res)=>res.json())
    .then(res=>{
        liCreator(res);
    })
    .catch(()=>{
        console.log('что-то пошло не так, список не обновился глобально') // TODO: обработать ошибку.
    })
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

updateListItem();