import cookies from 'js-cookie';
let refreshTokenTimeoutID = 0;


export const saveState = (state) => {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);

    } catch (err) {
        console.log(err);
    }
}
export const loadState = () => {
    try {
        let serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);

    } catch (error) {
        return undefined;
    }
}

/**
 * sets data in cookies
 * @param {string} name
 * @param {string} item [data that needs to be saved]
 */
export function setItem(name, item) {
    return cookies.set(name, item, { expires: 30 });
}

/**
 * gets data in cookies
 * @param {string} name [name of cookie]
 * @return {string} [cookie data]
 */
export function getItem(name) {
    return cookies.get(name);
}

/**
 * removes cookie
 * @param {string} name [name of cookie]
 */
export function removeItem(name) {
    cookies.remove(name);
}
export function setTokens(tokenObject) {
    setItem('ID_TOKEN', tokenObject.IdToken);
    setItem('IS_ADMIN', tokenObject.is_admin);
    setItem('USER', tokenObject.user_name);
    setItem('USER_ID', tokenObject.user_id);
    setItem('EXPIRE', tokenObject.expire);
    setTimeoutToken();

}

export function removeTokens() {
    removeItem('ID_TOKEN');
    removeItem('IS_ADMIN');
    removeItem('USER');
    removeItem('USER_ID');
    removeItem('EXPIRE');

}

function setTimeoutToken() {
    if (!(getItem('EXPIRE') && Number(getItem('EXPIRE')) * 1000 > Date.now())) {
        return;
    }

    clearTimeout(refreshTokenTimeoutID);
    refreshTokenTimeoutID = setTimeout(() => {
        removeTokens();
    }, Number(getItem('EXPIRE')) * 1000 - Date.now());
}
