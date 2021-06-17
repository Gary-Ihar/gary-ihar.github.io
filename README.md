# pay-list
 
### data format for the server:
```javascript
const data = {
    action: 'ADD_ITEM', // ADD_ITEM/REMOVE_ITEM/EDIT_ITEM/CLEAR_LIST
    data: {
        id: 0,              // number 
        productName: '',    // string
        productQnty: '',    // string
    },
}
JSON.stringify(data);
```   