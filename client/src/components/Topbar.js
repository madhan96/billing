import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import { removeTokens } from '../utils/localStorage';
import ChangePasswordModal from '../modals/ChangePasswordModal';
const styles = theme => ({
    root: {
        width: "calc(100% - 260px)"
    },
    flexGrow: {
        flexGrow: 1
    },
    iconBtn: {
        marginRight: '20px'
    }
})
class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            anchorEl: null,
            open: false
        }

    }
    componentDidUpdate(prevProps, prevState) {

    }
    setOpen = (value) => {
        this.setState({ open: value });
    }
    handleClickOpen = () => {
        this.setAnchorEl(null);
        this.setOpen(true);
    };

    handleClose = () => {
        this.setOpen(false);
    };

    handleClick = (event) => {
        this.setAnchorEl(event.currentTarget);
    };

    handleCloseDrawer = () => {
        this.setAnchorEl(null);
    };
    handleLogout = () => {
        this.setAnchorEl(null);
        removeTokens();
        window.location.href = '../login'
    }
    handleMenuClose = () => {
        console.log('menu');
        this.setAnchorEl(null);
    };
    setAnchorEl = (ele) => {
        this.setState({ anchorEl: ele });
    }
    moveToCart = (e) => {
        window.location.href = './bill'
    }

    // handleOpen = (event) => {
    //     this.setState({ isOpen: event.currentTarget });
    // }
    // handleClose = (event) => {
    //     this.setState({ isOpen: false });
    // }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar className={classes.root}>
                    <Toolbar>
                        <div className={classes.flexGrow} />
                        <div
                            className={classes.iconBtn}
                        >
                            <IconButton
                                color="inherit"
                                size="medium"
                                onClick={this.moveToCart}

                            >
                                <ShoppingCartIcon fontSize="large" />
                            </IconButton>
                        </div>
                        <div
                            className={classes.iconBtn}
                        >
                            <IconButton
                                color="inherit"
                                size="medium"

                                ref={element => { this.anchorRef = element }}
                                onClick={this.handleClick}
                            >
                                <PersonIcon fontSize="large" />
                            </IconButton>
                        </div>
                        {/* <Popper open={this.state.isOpen} anchorEl={this.anchorRef} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper> */}
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleMenuClose}
                        >
                            <MenuItem onClick={this.handleCloseDrawer}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClickOpen}>Change Password</MenuItem>
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <ChangePasswordModal open={this.state.open} handleClickOpen={this.handleClickOpen} handleClose={this.handleClose}
                />
            </div>
        );
    }
}

export default withStyles(styles)(TopBar);