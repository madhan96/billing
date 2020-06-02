export const setProductsList = (data) => {
    return ({ type: 'addProductList', data: data });
}

export const addCartData = (data) => {
    return ({ type: 'addCartProduct', data: data });
}

export const refreshCart = () => {
    return ({ type: 'refresh' });
}

