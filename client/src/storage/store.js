import { setProductsList } from '../actions/productdata';
export const products = [
    {
        id: 1,
        product_name: 'product1',
        price: 400,
        in_stock: 52,
        image: '/default/default-image.png',
        brand: 'brand1'

    },
    {
        id: 11,
        product_name: 'product15',
        price: 400,
        in_stock: 52,
        image: '/default/default-image.png',
        brand: 'brand1'

    },
    {
        id: 12,
        product_name: 'product178',
        price: 400,
        in_stock: 52,
        image: '/default/default-image.png',
        brand: 'brand1'

    },
    {
        id: 14,
        product_name: 'product12',
        price: 400,
        in_stock: 52,
        image: '/default/default-image.png',
        brand: 'brand1'

    }, {
        id: 41,
        product_name: 'product105',
        price: 400,
        in_stock: 52,
        image: '/default/default-image.png',
        brand: 'brand1'

    }, {
        id: 21,
        product_name: 'product1451',
        price: 400,
        in_stock: 52,
        image: '/default/default-image.png',
        brand: 'brand1'

    }, {
        id: 111,
        product_name: 'product021',
        price: 400,
        in_stock: 52,
        image: '/default/default-image.png',
        brand: 'brand1'

    }
];
export const selected = {
    1: {
        quantity: 2,
        product_id: 1,
        product_name: 'product1',
        price_per_unit: 400,
        price: 800,
        image: '/default/default-image.png'

    },
    41: {
        quantity: 1,
        product_id: 41,
        product_name: 'product105',
        price_per_unit: 400,
        price: 400,
        image: '/default/default-image.png'

    },
    111: {
        quantity: 1,
        product_id: 111,
        product_name: 'product021',
        price_per_unit: 400,
        price: 400,
        image: '/default/default-image.png',

    }


}

export const getProd = () => {

    return (dispatch) => {
        new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 2000);
        }).then(() => {
            console.log(products);
            dispatch(setProductsList(products));
        }

        )
    }
}

export const users = [
    {
        user_id: 12,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: false
    },
    {
        user_id: 2,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: false
    },
    {
        user_id: 121,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: false
    },
    {
        user_id: 112,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: false
    },
    {
        user_id: 712,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: false
    },
    {
        user_id: 172,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 812,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 182,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 128,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 412,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 142,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 124,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 512,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 152,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 125,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 612,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 162,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 126,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 912,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 192,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    },
    {
        user_id: 129,
        name: 'name 1',
        user_name: 'maddkd',
        is_admin: true
    }
]