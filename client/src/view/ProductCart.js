import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getProd } from '../services/request-services';
import { Divider, Grid, Typography, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ProductCard from '../components/ProductCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Styles = theme => ({
    root: {
        padding: theme.spacing(3)

    },
    content: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4)
    },
    // pagination: {
    //     marginTop: theme.spacing(3),
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'flex-end'
    // }
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

});

class ProductCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            productsPerPage: 5
        }
        this.props.getProd();
    }

    handleChange = (event, value) => {
        this.setState({ page: --value });
    };
    handleNopChange = (event) => {
        this.setState({ productsPerPage: event.target.value });

    };
    render() {
        //console.log('loading cart render');
        const { classes, products } = this.props;
        const { page, productsPerPage } = this.state;
        //console.log(this.props);

        return (

            <div className={classes.root}>

                <div className={classes.content}>
                    <Grid
                        container
                        spacing={3}
                    >
                        {products.slice(page * productsPerPage, page * productsPerPage + productsPerPage).map(product => (
                            <Grid
                                container
                                justify="center"
                                item
                                key={product.id}
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
                {/* <div className={classes.pagination}>
                    <Typography variant="caption">1-6 of 20</Typography>
                    <IconButton>
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton>
                        <ChevronRightIcon />
                    </IconButton>
                </div> */}
                <Divider />
                <Grid
                    container
                    justify="center"
                    alignItems="center">
                    <Typography>Products per page:</Typography>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Per-Page</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={productsPerPage}
                            onChange={this.handleNopChange}
                            label="Per-Page"
                        >

                            <MenuItem value={5}>Five</MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={15}>Fifteen</MenuItem>
                        </Select>
                    </FormControl>
                    <Pagination count={products.length % productsPerPage === 0 ? Math.floor(products.length / productsPerPage) : Math.floor(products.length / productsPerPage) + 1} page={page + 1} onChange={this.handleChange} />
                </Grid>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.productList,
        cartList: state.products.selectedProducts

    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getProd
    }, dispatch);
};
const ProductCartWithStyles = withStyles(Styles)(ProductCart);
export default connect(mapStateToProps, mapDispatchToProps)(ProductCartWithStyles)