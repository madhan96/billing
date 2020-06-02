import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, Button, Grid, Typography, Divider, Input, IconButton, TextField } from '@material-ui/core';
import { addCartData, refreshCart } from '../actions/productdata';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { addSale } from '../services/service-calls';
import { getItem } from '../utils/localStorage'
import CloseIcon from '@material-ui/icons/Close';

const Styles = theme => ({
    total: {
        marginBottom: theme.spacing(4)
    },
    btmDiv: {
        marginBottom: theme.spacing(4)
    },
    topBar: {
        padding: '16px 16px'
    },
    cartList: {
        padding: '16px 16px'
    },
    imageContainer: {
        height: 160,
        width: '250px',
        margin: '0 auto',
        border: `1px solid #eeeeee`,
        borderRadius: '5px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 10px'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    Btn: {
        marginBottom: theme.spacing(4),
        marginRight: theme.spacing(4)
    },
    checkBtn: {
        marginBottom: theme.spacing(4),

    },
    formInputh4: {
        margin: 0
    },
    formInput: {
        margin: theme.spacing(1)
    },
    custDiv: {
        padding: theme.spacing(2)
    },
    h4con: {
        marginBottom: theme.spacing(3)
    },
    muted: {
        color: 'rgba(52, 49, 76, 0.54)',
        marginBottom: theme.spacing(3)
    }

});
class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: this.setTotal(),
            checkOut: false,
            Notify: false,
            SaleID: '',
            customer: {}
        }
        this.myRef = React.createRef();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.total !== Object.values(this.props.cartList).reduce((accumulator, currentValue) => accumulator + currentValue.price, 0))
            this.setState({ total: Object.values(this.props.cartList).reduce((accumulator, currentValue) => accumulator + currentValue.price, 0) })
    }
    setTotal = () => {
        return Object.values(this.props.cartList).reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
    }
    deleteCartItem = (cart) => {
        this.props.addCartData({ ...cart, quantity: 0 });
    }
    // changeQuan = (event, cart, ind) => {
    //     if (event.target.value !== '') {
    //         this.props.addCartData({ ...cart, quantity: event.target.value, price: cart.price_per_unit * event.target.value })
    //     } else {
    //         console.log(this[`cartItem${ind}`].firstElementChild.value);
    //         this[`cartItem${ind}`].firstElementChild.value = '';
    //     }
    // }
    increaseQuantity = (cart) => {
        this.props.addCartData({ ...cart, quantity: cart.quantity + 1, price: cart.price_per_unit * (cart.quantity + 1) });
    }
    decQuant = (cart) => {
        this.props.addCartData({ ...cart, quantity: cart.quantity - 1, price: cart.price_per_unit * (cart.quantity - 1) });
    }
    showCheckOut = (event) => {
        this.setState({ checkOut: true });
    }
    quitcheckOut = (event) => {
        this.setState({ checkOut: false });
    }
    setSaleId = (SaleID) => {
        this.setState({ Notify: true, SaleID });
        this.props.refreshCart();
    }
    setNotify = () => {
        this.setState({ Notify: true });
    }
    handleChange = (eve) => {
        let customer = this.state.customer;
        customer[eve.target.name] = eve.target.value;
        this.setState({ customer });
    }
    submitSale = (e) => {
        const user_id = getItem('USER_ID');
        const { customer, total } = this.state;
        const products = Object.values(this.props.cartList).map(({ product_name, image, ...rest }) => rest);
        let data = { products, user_id, customer, sale_amount: total, time_of_sale: Date.now() };
        addSale(data, this.setSaleId, this.setNotify);
    }
    render() {
        const { classes, cartList } = this.props;
        return (
            !this.state.checkOut ? (<Paper>
                <div className={classes.topBar}>
                    <Grid
                        container
                    >
                        <Grid
                            item
                            lg={4}
                            md={4}
                            xs={4}
                            sm={4}
                        >
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            md={3}
                            xs={3}
                            sm={3}
                        >
                            <Typography
                                align="center"
                                variant="h6"
                            >
                                Name
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={true}
                        >
                            <Typography
                                align="center"
                                variant="h6"
                            >
                                Price
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={true}
                        >
                            <Typography
                                align="center"
                                variant="h6"
                            >
                                Quantity
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={true}
                        >
                            <Typography
                                align="center"
                                variant="h6"
                            >
                                Total
                            </Typography>
                        </Grid>

                    </Grid>
                </div>
                <Divider />


                {
                    Object.values(this.props.cartList).map((cart, ind) => {
                        return (
                            <div key={ind} className={classes.cartList}>
                                <Grid
                                    container
                                    alignItems="center"
                                >
                                    <Grid
                                        item
                                        container
                                        alignItems="center"
                                        lg={4}
                                        md={4}
                                        xs={4}
                                        sm={4}
                                    >
                                        <IconButton
                                            color="inherit"
                                            onClick={(e) => { this.deleteCartItem(cart) }}

                                        >
                                            <CloseIcon color='secondary' />
                                        </IconButton>

                                        <div className={classes.imageContainer}>
                                            <img
                                                alt="cartItem"
                                                className={classes.image}
                                                src={cart.image ? `http://localhost:5000/images/${cart.product_name}/${cart.image}` : 'http://localhost:5000/default/default-image.png'}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid
                                        item
                                        lg={3}
                                        md={3}
                                        xs={3}
                                        sm={3}
                                    >
                                        <Typography
                                            align="center"
                                            variant="h6"
                                        >
                                            {cart.product_name}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={true}
                                    >
                                        <Typography
                                            align="center"
                                            variant="h6"
                                        >
                                            {cart.price_per_unit}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={true}
                                    >
                                        {/* <Input
                                            onChange={(e) => { this.changeQuan(e, cart, ind) }}
                                            type="number"
                                            value={cart.quantity}
                                            ref={(ref) => {
                                                // ref && (ref.value = 10)
                                                this[`cartItem${ind}`] = ref;
                                            }}
                                        /> */}
                                        <Grid
                                            container
                                            alignItems="center"

                                        >
                                            <Grid
                                                item

                                            >
                                                <IconButton
                                                    color="primary"
                                                    onClick={(e) => { this.decQuant(cart) }}

                                                >
                                                    <RemoveCircleIcon fontSize="large" />
                                                </IconButton>
                                                <Typography
                                                    variant="h6"
                                                    align="center"
                                                >{cart.quantity}</Typography>
                                                <IconButton
                                                    color="primary"
                                                    onClick={(e) => { this.increaseQuantity(cart) }}

                                                >
                                                    <AddCircleIcon fontSize="large" />
                                                </IconButton>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={true}
                                    >
                                        <Typography
                                            align="center"
                                            variant="h6"
                                        >
                                            {cart.price}
                                        </Typography>
                                    </Grid>

                                </Grid>
                            </div>
                        );
                    })
                }

                <Divider className={classes.btmDiv} />
                <div>
                    <Grid
                        container
                        className={classes.total}
                    >
                        <Grid item xs={4} /> <Grid item xs={3} /> <Grid item xs={true} />
                        <Grid
                            item
                            xs={true}
                        >
                            <Typography
                                align="center"
                                variant="h6"
                            >
                                Total :
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={true}
                        >
                            <Typography
                                align="center"
                                variant="h6"
                            >
                                {`Rs.${this.state.total}`}
                            </Typography>
                        </Grid>

                    </Grid>
                    <Grid

                        container
                        justify='flex-end'
                    >

                        <Button
                            className={classes.Btn}
                            variant="contained"
                            color="primary"
                            onClick={this.showCheckOut}
                        >
                            Check Out
                        </Button>

                    </Grid>

                </div>
            </Paper>)
                : !this.state.Notify ? (

                    <Paper>
                        <form>
                            <Grid
                                container
                            >
                                <Grid
                                    item
                                    xs={7}
                                    className={classes.custDiv}
                                >

                                    <Grid
                                        container
                                        spacing={2}
                                    >
                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                label="FirstName"
                                                className={classes.formInput}
                                                name="firstName"
                                                value={this.state.customer.firstName}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                label="LastName"
                                                className={classes.formInput}
                                                name="lastName"
                                                value={this.state.customer.lastName}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Grid
                                        container
                                        spacing={2}
                                    >
                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                label="Email"
                                                className={classes.formInput}
                                                name="email"
                                                value={this.state.customer.email}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={6}
                                        >
                                            <TextField
                                                label="Phone-Number"
                                                variant="outlined"
                                                fullWidth
                                                className={classes.formInput}
                                                name="pnum"
                                                value={this.state.customer.pnum}
                                                onChange={this.handleChange}
                                            />
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid
                                    item
                                    xs={5}
                                    className={classes.custDiv}
                                >
                                    <Grid
                                        container
                                        justify="space-between"
                                        className={classes.h4con}
                                    >
                                        <h4 className={classes.formInputh4}>Product</h4>
                                        <h4 className={classes.formInputh4}>Total Price</h4>


                                    </Grid>
                                    {
                                        Object.values(this.props.cartList).map(
                                            (cart) => {
                                                return (<Grid
                                                    container
                                                    justify="space-between"

                                                >

                                                    <span className={classes.muted}>{cart.product_name}</span>
                                                    <span className={classes.muted}>{cart.price}</span>

                                                </Grid>);
                                            }
                                        )
                                    }
                                    <Grid
                                        container
                                        justify="space-between"
                                        className={classes.h4con}
                                    >
                                        <h4 className={classes.formInputh4}>Total</h4>
                                        <h4 className={classes.formInputh4}>{`Rs.${this.state.total}`}</h4>


                                    </Grid>
                                    <Button
                                        fullWidth
                                        className={classes.checkBtn}
                                        variant="contained"
                                        color="primary"
                                        onClick={this.submitSale}
                                    >
                                        Place Order
                                </Button>
                                    <Grid
                                        container
                                        justify="center"
                                    >
                                        <Button

                                            className={classes.checkBtn}
                                            variant="contained"
                                            color="primary"
                                            onClick={this.quitcheckOut}
                                        >
                                            Back
                                    </Button>
                                    </Grid>

                                </Grid>


                            </Grid>
                        </form>
                    </Paper>) : (
                        <Paper>
                            {
                                this.state.SaleID !== '' ? (
                                    <Typography variant="h3" gutterBottom color="primary"
                                    >
                                        {`Your Sale has been processed. Your Bill No. is ${this.state.SaleID} .`}
                                    </Typography>
                                ) : (
                                        <div>
                                            <Typography variant="h2" gutterBottom color="error">
                                                Sorry ...!!!
                                  </Typography>
                                            <Typography variant="h4" gutterBottom color="error">
                                                Your transaction could not be processed.
                                     </Typography>
                                        </div>
                                    )
                            }

                        </Paper>
                    )
        );
    }
}
const mapStateToProps = (state) => {
    return {

        cartList: state.selectedProducts,


    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addCartData,
        refreshCart
    }, dispatch);
};

const CartWithStyles = withStyles(Styles)(Cart);
export default connect(mapStateToProps, mapDispatchToProps)(CartWithStyles);