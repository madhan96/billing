import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { getUsers } from '../services/request-services';
import { Paper, Button, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TablePagination } from '@material-ui/core'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import UserModal from '../modals/UserModal';
import DeleteModal from '../modals/DeleteModal';
const columns = [
    {
        id: 'user_id',
        label: 'Id',
        minWidth: 150,

        format: (value) => value.toLocaleString(),
    },
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'user_name', label: 'UserName', minWidth: 150 },

    {
        id: 'is_admin',
        label: 'Admin Rights',
        minWidth: 150,
        align: 'center',
        format: (value) => value ? 'Yes' : 'No',
    },
    {
        id: 'actions',
        key: 'actions',
        label: 'Actions',
        minWidth: 200,
        align: 'center',

    },
];
const Styles = theme => ({
    root: {
        padding: theme.spacing(3),
        margin: "64px 30px 30px"
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
    container: {
        maxHeight: 440,
    },

});
class UserMang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
            selectedUser: {},
            open: false,
            delopen: false
        }
        this.props.getUsers();
    }
    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
        this.setState({ page: 0 });
    };
    openAddUser = () => {
        this.setState({
            selectedUser: {},
            open: true
        });
    }
    closeUserModal = () => {
        this.setState({
            selectedUser: {},
            open: false
        })
    }
    closeDeleteModal = () => {
        this.setState({
            selectedUser: {},
            delopen: false
        })
    }
    openEditUser = (user) => {
        this.setState({
            selectedUser: user,
            open: true
        })
    }
    openDeleteUser = (user) => {
        this.setState({
            selectedUser: user,
            delopen: true
        })
    }
    render() {
        const { users, classes } = this.props;
        //console.log(users);
        return (
            <div className={classes.root}>
                <Typography
                    align="left"
                    variant="h3"
                    className={classes.title}
                >
                    User Table
                </Typography>
                <Button variant="contained" color="primary" className={classes.addBtn} onClick={(e) => { this.openAddUser() }}>
                    ADD USER
                </Button>
                <Paper className={classes.tableroot}>
                    <TableContainer className={classes.container}>
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
                                {users.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((user) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={user.user_id}>
                                            {columns.map((column) => {
                                                if (column.id !== 'actions') {
                                                    const value = user[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format ? column.format(value) : value}
                                                        </TableCell>
                                                    );

                                                } else {
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            <IconButton
                                                                color="inherit"
                                                                onClick={(e) => { this.openEditUser(user) }}

                                                            >
                                                                <EditIcon color='primary' />
                                                            </IconButton>
                                                            <IconButton
                                                                color="inherit"
                                                                onClick={(e) => { this.openDeleteUser(user) }}

                                                            >
                                                                <DeleteIcon color='secondary' />
                                                            </IconButton>
                                                        </TableCell>
                                                    );
                                                }
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
                        count={users.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <UserModal open={this.state.open} user={this.state.selectedUser} handleClose={this.closeUserModal} />
                <DeleteModal record={'user'} user={this.state.selectedUser} open={this.state.delopen} handleClose={this.closeDeleteModal} />
            </div>
        );
    }


}
const mapStateToProps = (state) => {
    return {
        users: state.users.userList
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUsers
    }, dispatch);
};
const UserMangWithStyles = withStyles(Styles)(UserMang);
export default connect(mapStateToProps, mapDispatchToProps)(UserMangWithStyles);