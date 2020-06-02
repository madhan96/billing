export const selectedProducts = (state = {}, action) => {
    switch (action.type) {
        case 'addCartProduct': if (!action.data.quantity > 0) {
            let temp = Object.assign({}, state);
            delete temp[action.data.product_id];
            return temp;


        } else {
            let temp = Object.assign({}, state);
            temp[action.data.product_id] = action.data;
            //console.log('here');
            return temp;

        }
        case 'refresh':
            return {};
        default:
            return state;
    }
}