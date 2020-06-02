const initialState = {
    userList: [],
}
export const users = (state = initialState, action) => {
    switch (action.type) {
        case 'addUserList':
            return { ...state, userList: action.data };
        default:
            return state;
    }
}