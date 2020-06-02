import { getItem } from '../utils/localStorage';
function CustomException(err) {
    //console.log(err);
    // error.then(err => {
    //     this.message = err.errorMessage;
    //     this.name = err.name;
    //     this.errorName = err.errorName;
    // })
    this.message = err.errorMessage;
    this.name = err.name;
    this.errorName = err.errorName;
}
export const postProducts = (formData, callback) => {
    fetch('http://localhost:5000/product/addProduct', {
        method: 'POST',
        headers: {
            "authorization": "bearer" + " " + getItem('ID_TOKEN')
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
    })
        .then(async (response) => {
            let res = await response.json()
            if (response.ok) {
                return res;
            } else {
                throw new CustomException(res);
            }
        }
        ).then((result) => {
            //console.log('Success:', result);
            callback();
        })
        .catch((error) => {
            if (error.errorName === 'usedName') {
                alert(error.message);
            } else {
                alert('An Error Occured: Please try Again!');
            }
            //console.error('Error:', error);
        });
}


export const getProducts = (callback) => {
    fetch('http://localhost:5000/product/getProducts', {
        method: "GET",
        headers: {
            "authorization": "bearer" + " " + getItem('ID_TOKEN')
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid Input')
        };
    })
        .then(res => {
            callback(res);
        }).catch(error => {
            alert('An Error Occured: Please try Again!');
            //console.error('Error:', error);
        })
}

export const editProducts = (formData, callback) => {
    fetch('http://localhost:5000/product/editProduct', {
        method: 'POST',
        headers: {
            "authorization": "bearer" + " " + getItem('ID_TOKEN')
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid Input')
            };
        })
        .then((result) => {
            //console.log('Success:', result);
            callback();
        })
        .catch((error) => {
            //console.error('Error:', error);
        });
}

export const deleteProduct = (data, callBackSuc, callbackFail) => {
    fetch('http://localhost:5000/product/deleteProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": "bearer" + " " + getItem('ID_TOKEN')
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid Input')
            };
        })
        .then((result) => {
            //console.log('Success:', result);
            callBackSuc(result);
        })
        .catch((error) => {
            alert('An Error Occured: Please try Again!');
            callbackFail();
        });
}

export const addSale = (data, callback, callbackFail) => {
    fetch('http://localhost:5000/sale/addSale', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": "bearer" + " " + getItem('ID_TOKEN')
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid Input')
            };
        })
        .then((result) => {
            // console.log('Success:', result);
            callback(result.saleId);
        })
        .catch((error) => {
            //console.error('Error:', error);
            callbackFail();
        });
}

export const loginService = (data, callBackSuc, callbackFail) => {
    fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid Input');
            }
        }
        ).then((result) => {
            //console.log('Success:', result);
            callBackSuc(result);
        })
        .catch((error) => {
            // console.error('Error:', error);
            callbackFail();
        });
}

export const passwordService = (data, callBackSuc, callbackFail) => {
    fetch('http://localhost:5000/users/changePass', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": "bearer" + " " + getItem('ID_TOKEN')
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid Input')
            };
        })
        .then((result) => {
            //console.log('Success:', result);
            callBackSuc();
        })
        .catch((error) => {
            alert('An Error Occured: Please try Again!');
            callbackFail();
        });
}

export const userService = (callBackSuc, callbackFail) => {
    fetch('http://localhost:5000/users/getUsers', {
        method: 'GET',
        headers: {

            "authorization": "bearer" + " " + getItem('ID_TOKEN'),
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid Input')
        };
    })
        .then((result) => {
            //console.log('Success:', result);
            callBackSuc(result);
        })
        .catch((error) => {
            alert('An Error Occured: Please try Again!');
            callbackFail();
        });
}

export const createUser = (data, callBackSuc, callbackFail) => {
    fetch('http://localhost:5000/users/post_user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": "bearer" + " " + getItem('ID_TOKEN'),
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then(async (response) => {
            let res = await response.json()
            if (response.ok) {
                return res;
            } else {
                throw new CustomException(res);
            }
        })
        .then((result) => {
            //console.log('Success:', result);
            callBackSuc();
        })
        .catch((error) => {
            if (error.errorName === "usedName") {
                alert(error.message);
            } else {
                alert('An Error Occured: Please try Again!');
            }
            callbackFail();
        });
}

export const editUser = (data, callBackSuc, callbackFail) => {
    fetch('http://localhost:5000/users/editUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": "bearer" + " " + getItem('ID_TOKEN'),
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid Input')
            };
        })
        .then((result) => {
            // console.log('Success:', result);
            callBackSuc(result);
        })
        .catch((error) => {
            alert('An Error Occured: Please try Again!');
            callbackFail();
        });
}

export const deleteUser = (data, callBackSuc, callbackFail) => {
    fetch('http://localhost:5000/users/deleteUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": "bearer" + " " + getItem('ID_TOKEN'),
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid Input')
            };
        })
        .then((result) => {
            //console.log('Success:', result);
            callBackSuc(result);
        })
        .catch((error) => {
            alert('An Error Occured: Please try Again!');
            callbackFail();
        });
}

export const productReportService = (data, callBackSuc) => {
    fetch('http://localhost:5000/sale/getPro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": "bearer" + " " + getItem('ID_TOKEN'),

        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid Input')
            };
        }).then((result) => {
            // console.log('Success:', result);
            callBackSuc(result);
        })
        .catch((error) => {
            alert('An Error Occured: Please try Again!');
            //console.log(error);
            //callbackFail();
        });
}

export const billReportService = (data, callBackSuc, callbackFail) => {
    fetch('http://localhost:5000/sale/getBill', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization": "bearer" + " " + getItem('ID_TOKEN'),
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Invalid Input')
            };
        })
        .then((result) => {
            //console.log('Success:', result);
            callBackSuc(result);
        })
        .catch((error) => {
            alert('An Error Occured: Please try Again!');
            //callbackFail();
        });
}