import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getBillReport, getProReport } from '../services/request-services';
import { Paper, Button, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, TablePagination, Grid } from '@material-ui/core'
import { connect } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getProd } from '../services/request-services';
import { bindActionCreators } from 'redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import UserModal from '../modals/UserModal';
const columns = [
    {
        id: 'billno',
        label: 'Bill No',
        minWidth: 150,
        format: (value) => value.toLocaleString(),
    },
    { id: 'timeofsale', label: 'Time Of Sale', minWidth: 150 },
    { id: 'totalbill', label: 'Total Bill Amount', minWidth: 150, format: (value) => value.toLocaleString() },
    { id: 'price', label: 'Price', minWidth: 150, format: (value) => value.toLocaleString() },
    { id: 'price_per_unit', label: 'Price Per Unit', minWidth: 150, format: (value) => value.toLocaleString() },
    { id: 'customerFirstName', label: 'Customer First Name', minWidth: 150 },
    { id: 'customerLastName', label: 'Customer Last Name', minWidth: 150 },
    { id: 'customerPhone', label: 'Customer Phone', minWidth: 150 },
    { id: 'customerEmail', label: 'Customer Email', minWidth: 150 },
    { id: 'product_name', label: 'Product Name', minWidth: 150 }


];
const billcolumns = [
    {
        id: 'billno',
        label: 'Bill No',
        minWidth: 150,
        format: (value) => value.toLocaleString(),
    },
    { id: 'timeofsale', label: 'Time Of Sale', minWidth: 150 },
    { id: 'totalbill', label: 'Total Bill Amount', minWidth: 150, format: (value) => value.toLocaleString() },
    { id: 'customerFirstName', label: 'Customer First Name', minWidth: 150 },
    { id: 'customerLastName', label: 'Customer Last Name', minWidth: 150 },
    { id: 'customerPhone', label: 'Customer Phone', minWidth: 150 },
    { id: 'customerEmail', label: 'Customer Email', minWidth: 150 }
]
const Styles = theme => ({
    root: {
        padding: theme.spacing(3),
        margin: "64px 30px 30px"
    },
    report: {
        margin: "0px 30px 50px"
    },
    title: {
        marginBottom: theme.spacing(4)
    },
    addBtn: {
        marginBottom: theme.spacing(4)
    },
    tableroot: {
        width: '100%'
    },
    tablecontainer: {
        maxHeight: 440,
    },
    auto: {
        width: 300
    }

});
class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
            productName: { product_name: "" },
            billDate: "YYYY-MM-DD",
            lastBillDate: "YYYY-MM-DD",
            billpage: 0,
            billrowsPerPage: 10
        }
        this.props.getProd();
    }
    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
        this.setState({ page: 0 });
    };
    handleChangeBillPage = (event, newPage) => {
        this.setState({ billpage: newPage });
    };
    handleChangeBillRowsPerPage = (event) => {
        this.setState({ billrowsPerPage: event.target.value });
        this.setState({ billpage: 0 });
    };
    handleChange = (value) => {
        //console.log(value);
        this.setState({ productName: value });
    }
    handleBillChange = (e) => {
        this.setState({ billDate: e.target.value })
    }
    handleLastBillChange = (e) => {
        this.setState({ lastBillDate: e.target.value })
    }

    getProductDetails = () => {
        const productName = this.state.productName.product_name;
        this.props.getProReport({ productName });
    }
    getBillDetails = () => {
        const { billDate, lastBillDate } = this.state;
        this.props.getBillReport({ billDate, lastBillDate });
    }
    render() {
        const { billreport, productreport, classes } = this.props;
        //console.log(this.props.products);
        const defaultProps = {
            options: this.props.products,
            getOptionLabel: (option) => option.product_name,
        };

        return (
            <div className={classes.root}>
                <div
                    className={classes.report}

                >

                    <Typography
                        align="left"
                        variant="h3"
                        className={classes.title}
                    >
                        Enter Product Name:
                    </Typography>


                    <Grid
                        container
                        alignItems="center"
                        spacing={2}
                        className={classes.addBtn}
                    >
                        <Grid
                            item
                            className={classes.auto}
                        >
                            <Autocomplete
                                {...defaultProps}
                                id="controlled-demo"
                                value={this.state.productName}
                                onChange={(event, newValue) => {
                                    this.handleChange(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} label="Product" size="medium" variant="outlined" />}
                            />
                        </Grid>
                        <Grid
                            item
                        >

                            <Button variant="contained" color="primary" onClick={(e) => { this.getProductDetails() }}>
                                Search
                            </Button>
                        </Grid>
                    </Grid>


                    <Paper className={classes.tableroot}>
                        <TableContainer className={classes.tablecontainer}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productreport.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((report) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={report.billno}>
                                                {columns.map((column) => {
                                                    const value = report[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format ? column.format(value) : value}
                                                        </TableCell>
                                                    );

                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={productreport.length}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Paper>

                </div>
                <div className={classes.report}>
                    <Typography
                        align="left"
                        variant="h3"
                        className={classes.title}
                    >
                        Enter Bill Date:
                </Typography>
                    <Grid
                        container
                        alignItems="center"
                        spacing={2}
                        className={classes.addBtn}
                    >
                        <Grid
                            item
                        >
                            <TextField
                                size="medium"
                                variant="outlined"
                                onChange={this.handleBillChange}
                                value={this.state.billDate}
                                label="Start Date"

                            />
                        </Grid>
                        <Grid
                            item
                        >
                            <TextField
                                size="medium"
                                variant="outlined"
                                onChange={this.handleLastBillChange}
                                value={this.state.lastBillDate}
                                label="End Date"

                            />
                        </Grid>
                        <Grid
                            item
                        >
                            <Button variant="contained" color="primary" onClick={(e) => { this.getBillDetails() }}>
                                Search
                </Button>
                        </Grid>
                    </Grid>
                    <Paper className={classes.tableroot}>
                        <TableContainer className={classes.tablecontainer}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {billcolumns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {billreport.slice(this.state.page * this.state.billrowsPerPage, this.state.page * this.state.billrowsPerPage + this.state.billrowsPerPage).map((report) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={report.billno}>
                                                {billcolumns.map((column) => {
                                                    const value = report[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format ? column.format(value) : value}
                                                        </TableCell>
                                                    );

                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={billreport.length}
                            rowsPerPage={this.state.billrowsPerPage}
                            page={this.state.page}
                            onChangePage={this.handleChangeBillPage}
                            onChangeRowsPerPage={this.handleChangeBillRowsPerPage}
                        />
                    </Paper>
                </div>

            </div>
        );
    }


}
const mapStateToProps = (state) => {
    return {
        products: state.products.productList,
        productreport: state.productreports.proList,
        billreport: state.billreports.billList
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getBillReport,
        getProReport,
        getProd
    }, dispatch);
};
const ReportsWithStyle = withStyles(Styles)(Reports);
export default connect(mapStateToProps, mapDispatchToProps)(ReportsWithStyle);