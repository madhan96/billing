const proState = {
    proList: [],
}

const billState = {
    billList: [],
}
export const productreports = (state = proState, action) => {
    switch (action.type) {
        case 'addProductReports':
            let temp = Object.assign({}, state);
            temp['proList'] = action.data;
            return temp;
        default:
            return state;
    }
}

export const billreports = (state = billState, action) => {
    switch (action.type) {
        case 'addBillingReports':
            let temp = Object.assign({}, state);
            temp['billList'] = action.data;
            return temp;
        default:
            return state;
    }
}


