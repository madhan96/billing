import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    Divider,
    IconButton,
    TextField,
    Button

} from '@material-ui/core';
import { addCartData } from '../actions/productdata';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// const product = {
//     id: 1,
//     product_name: 'product1',
//     price: 400,
//     in_stock: 10,
//     image: '/default/default-image.png',
//     brand: 'brand1'
// }
const Styles = theme => ({
    root: {
        position: 'relative',

        width: 350,
        padding: '5px 10px 5px'
    },
    imageContainer: {
        height: 180,
        width: '100%',
        margin: '0 auto',
        border: `1px solid #eeeeee`,
        borderRadius: '5px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    statsItem: {
        display: 'flex',
        alignItems: 'center',
    },
    statsIcon: {
        color: "#546e7a",
        marginRight: theme.spacing(1)
    },
    priceIcon: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
        background: '#f4f3f2',
        border: '1px solid #fcfcfc',
        padding: '10px 10px 10px'
    },
    addProduct: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 70
        }
    }
});
class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 0
        }

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.inputValue !== this.state.inputValue) return true;
        console.log('should' + this.props.product.product_name);
        const { id } = this.props.product;
        if (!nextProps.cartList[id] && !this.props.cartList[id]) {
            return false;
        } else {
            if (this.props.cartList[id] && nextProps.cartList[id] && this.props.cartList[id].quantity === nextProps.cartList[id].quantity) return false;
        }
        console.log('here in should');
        console.log(this.props.cartList);
        console.log('----');
        console.log(nextProps.cartList);
        return true;
    }
    updateCart = (value) => {
        console.log(value);
        this.props.addCartData({
            quantity: value,
            price_per_unit: this.props.product.price,
            price: value * Number.parseInt(this.props.product.price),
            product_id: this.props.product.id,
            product_name: this.props.product.product_name,
            image: this.props.product.image
        })
        console.log('updated')
    }
    setValue = (value) => {
        let val = ProductCard.extractNumbers(value);
        console.log('value is' + val);
        if (this.props.product.in_stock > val) {

            this.updateCart(val);
        }
        if (val === '' || val === 0) {
            this.setState({ inputValue: val });
        }
    }
    reduceValue = () => {
        let value = this.props.cartList[this.props.product.id] ? this.props.cartList[this.props.product.id].quantity : 0;
        if (value > 0) {

            this.updateCart(--value);
        }
    }
    addValue = () => {
        let value = this.props.cartList[this.props.product.id] ? this.props.cartList[this.props.product.id].quantity : 0;

        if (this.props.product.in_stock > value) {

            this.updateCart(++value);
            if (this.state.inputValue === '') this.setState({ inputValue: 0 });
        }

    }
    static extractNumbers = (value) => {
        return String(value).replace(new RegExp("[^0-9]"), "");
    };
    render() {
        const { classes, product } = this.props;
        console.log(`card render state is ${this.state.inputValue} `);



        return (<Card

            className={classes.root}
        >
            <CardContent>
                <div className={classes.imageContainer}>
                    <img
                        alt="Product"
                        className={classes.image}
                        src={product.image ? `http://localhost:5000/images/${product.product_name}/${product.image}` : 'http://localhost:5000/default/default-image.png'}
                    />
                </div>
                <Typography
                    align="center"
                    // gutterBottom
                    variant="h5"
                >
                    {product.product_name}
                </Typography>
                <Typography
                    align="center"
                    variant="h6"
                >
                    {product.brand}
                </Typography>
                {product.in_stock > 0 ? (
                    <Typography
                        align="center"
                        variant="body2"
                    >
                        {`${product.in_stock} in stock`}
                    </Typography>
                ) : (
                        <Typography
                            align="center"
                            variant="body2"
                            color='error'
                        >
                            {`out of stock !!`}
                        </Typography>
                    )
                }
            </CardContent>
            <Divider />
            <CardActions>
                <div className={classes.priceIcon}>
                    <Typography
                        align="left"
                        variant="h6"
                    >
                        {`Price: Rs.${product.price}`}
                    </Typography>
                    {window.location.href.indexOf('dashboard') > -1 ? (
                        <Grid
                            container
                            alignItems="center"
                            direction="column"
                        >
                            <Grid
                                item
                                className={classes.addProduct}
                            >
                                <IconButton
                                    color="primary"
                                    onClick={(e) => { this.reduceValue() }}
                                    disabled={!product.in_stock > 0}
                                >
                                    <RemoveCircleIcon fontSize="large" />
                                </IconButton>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    value={this.props.cartList[product.id] ? this.props.cartList[product.id].quantity : this.state.inputValue}
                                    onChange={(e) => { this.setValue(e.target.value) }}
                                    disabled={!product.in_stock > 0}
                                />
                                <IconButton
                                    color="primary"
                                    onClick={(e) => { this.addValue() }}
                                    disabled={!product.in_stock > 0}
                                >
                                    <AddCircleIcon fontSize="large" />
                                </IconButton>

                            </Grid>
                        </Grid>)
                        : (
                            <Grid
                                container
                                justify="space-between"
                            >
                                <Grid
                                    className={classes.statsItem}
                                    item
                                >
                                    <Button variant="contained" color="primary" onClick={(e) => { this.props.editProduct(product) }}>
                                        EDIT
              </Button>
                                </Grid>
                                <Grid
                                    className={classes.statsItem}
                                    item
                                >
                                    <Button variant="contained" color="secondary" onClick={(e) => { this.props.deleteProduct(product) }}>
                                        DELETE
              </Button>
                                </Grid>
                            </Grid>
                        )}
                </div>
            </CardActions>
        </Card>);
    }
}
const mapStateToProps = (state) => {
    return {

        cartList: state.selectedProducts,


    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addCartData
    }, dispatch);
};

const ProductCardWithStyles = withStyles(Styles)(ProductCard);
export default connect(mapStateToProps, mapDispatchToProps)(ProductCardWithStyles);
