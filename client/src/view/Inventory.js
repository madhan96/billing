import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getProd } from '../services/request-services';
import { Divider, Grid, Typography, MenuItem, Select, InputLabel, FormControl, Button } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ProductCard from '../components/ProductCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProductModal from '../modals/ProductModal';
import DeleteModal from '../modals/DeleteModal';

const Styles = theme => ({
    root: {
        padding: theme.spacing(3)

    },
    title: {
        marginBottom: theme.spacing(4)
    },
    addBtn: {
        marginBottom: theme.spacing(4)
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

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            productsPerPage: 5,
            selectedProduct: {},
            open: false,
            delopen: false
        }
        this.props.getProd();
    }


    handleChange = (event, value) => {
        this.setState({ page: --value });
    };
    handleNopChange = (event) => {
        this.setState({ productsPerPage: event.target.value });

    };
    openAddProduct = () => {
        this.setState({
            selectedProduct: {},
            open: true
        });
    }
    closeProductModal = () => {
        this.setState({
            selectedProduct: {},
            open: false
        })
    }
    closeDeleteModal = () => {
        this.setState({
            selectedProduct: {},
            delopen: false
        })
    }
    openEditProduct = (product) => {
        this.setState({
            selectedProduct: product,
            open: true
        })
    }
    openDeleteProduct = (product) => {
        this.setState({
            selectedProduct: product,
            delopen: true
        })
    }
    render() {
        console.log('loading cart render');
        const { classes, products } = this.props;
        const { page, productsPerPage } = this.state;
        console.log(this.state);

        return (

            <div className={classes.root}>
                <Typography
                    align="left"
                    variant="h3"
                    className={classes.title}
                >
                    Inventory
                </Typography>
                <Button variant="contained" color="primary" className={classes.addBtn} onClick={(e) => this.openAddProduct()}>
                    ADD PRODUCT
                </Button>
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
                                <ProductCard product={product} editProduct={this.openEditProduct} deleteProduct={this.openDeleteProduct} />
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
                <ProductModal product={this.state.selectedProduct} ref={element => this.refEle = element} open={this.state.open}
                    handleClose={this.closeProductModal}
                />
                <DeleteModal record={'product'} product={this.state.selectedProduct} open={this.state.delopen} handleClose={this.closeDeleteModal} />

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
const InventoryWithStyles = withStyles(Styles)(Inventory);
export default connect(mapStateToProps, mapDispatchToProps)(InventoryWithStyles)