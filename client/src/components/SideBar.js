import React, { Component } from 'react';
import Dashboard from "@material-ui/icons/Dashboard";
import StoreIcon from '@material-ui/icons/Store';
import Person from "@material-ui/icons/Person";
import AssessmentIcon from '@material-ui/icons/Assessment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { getItem } from '../utils/localStorage.js';
// @material-ui/core components
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
const sidebarStyle = theme => ({
    drawerPaper: {
        border: "none",
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        zIndex: "1",
        boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
        width: 260,
        [theme.breakpoints.up("md")]: {
            width: 260,
            position: "fixed",
            height: "100%"
        },
        [theme.breakpoints.down("sm")]: {
            width: 260,
            boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
            position: "fixed",
            display: "block",
            top: "0",
            height: "100vh",
            right: "0",
            left: "auto",
            zIndex: "1032",
            visibility: "visible",
            overflowY: "visible",
            borderTop: "none",
            textAlign: "left",
            paddingRight: "0px",
            paddingLeft: "0",
            transform: `translate3d(260px, 0, 0)`,
            transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        }
    },

    background: {
        position: "absolute",
        zIndex: "1",
        height: "100%",
        width: "100%",
        display: "block",
        top: "0",
        left: "0",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        "&:after": {
            position: "absolute",
            zIndex: "3",
            width: "100%",
            height: "100%",
            content: '""',
            display: "block",
            background: "#000",
            opacity: ".8"
        }
    },
    list: {
        marginTop: "20px",
        paddingLeft: "0",
        paddingTop: "0",
        paddingBottom: "0",
        marginBottom: "0",
        listStyle: "none",
        position: "unset"
    },
    item: {
        position: "relative",
        display: "block",
        textDecoration: "none",
        "&:hover,&:focus,&:visited,&": {
            color: "#FFF"
        }
    },
    itemLink: {
        width: "auto",
        transition: "all 300ms linear",
        margin: "10px 15px 0",
        borderRadius: "3px",
        position: "relative",
        display: "block",
        padding: "10px 15px",
        backgroundColor: "transparent",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "300",
        lineHeight: "1.5em"
    },
    itemIcon: {
        width: "24px",
        height: "30px",
        fontSize: "24px",
        lineHeight: "30px",
        float: "left",
        marginRight: "15px",
        textAlign: "center",
        verticalAlign: "middle",
        color: "rgba(255, 255, 255, 0.8)"
    },

    itemText: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: "300",
        lineHeight: "1.5em",
        margin: "0",
        lineHeight: "30px",
        fontSize: "14px",
        color: "#FFF"
    },
    whiteFont: {
        color: "#FFF"
    },
    blue: {
        backgroundColor: "#00acc1",
        boxShadow:
            "0 12px 20px -10px rgba(0, 172, 193,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(0, 172, 193,.2)",
        "&:hover,&:focus": {
            backgroundColor: "#00acc1",
            boxShadow:
                "0 12px 20px -10px rgba(0, 172, 193,.28), 0 4px 20px 0 rgba(0, 0, 0,.12), 0 7px 8px -5px rgba(0, 172, 193,.2)"
        }
    },
    sidebarWrapper: {
        position: "relative",
        height: "calc(100vh - 75px)",
        overflow: "auto",
        width: "260px",
        zIndex: "4",
        overflowScrolling: "touch"
    },
    imageContainer: {
        height: 220,
        width: '200px',
        margin: '20px auto 20px',
        border: `1px rgba(0, 0, 0, .4)`,
        borderRadius: '5px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: "4",
    },
    image: {
        width: '100%'
    },
});
function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
}

class Sidebar extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        const { classes } = this.props;
        let color = "blue";
        const routes = [
            {
                path: "/dashboard",
                name: "Dashboard",
                layout: "/app",
                icon: Dashboard
            },
            {
                path: "/user",
                name: "User Management",
                icon: Person,
                layout: "/app"
            },
            {
                path: "/invent",
                name: "Inventory Management",
                icon: StoreIcon,
                layout: "/app"
            },
            {
                path: "/bill",
                name: "Billing",
                icon: ReceiptIcon,
                layout: "/app"
            },
            {
                path: "/report",
                name: "Reports",
                icon: AssessmentIcon,
                layout: "/app"
            },


        ];
        let links = (
            <List className={classes.list}>
                {routes.map((prop, key) => {
                    // && (getItem('IS_ADMIN') === 1)
                    if ((prop.name === "User Management") && !(getItem('IS_ADMIN') == 1)) {
                        //console.log('rejected user manag');
                        return null;
                    }
                    // console.log(getItem('IS_ADMIN'));
                    const listItemClasses = activeRoute(prop.layout + prop.path) ? " " + classes[color] : "";
                    const whiteFontClasses = activeRoute(prop.layout + prop.path) ? " " + classes.whiteFont : "";
                    return (
                        <NavLink
                            to={prop.layout + prop.path}
                            className={classes.item}
                            activeClassName="active"
                            key={key}
                        >
                            <ListItem button className={classes.itemLink + listItemClasses}>
                                {typeof prop.icon === "string" ? (
                                    <Icon
                                        className={classes.itemIcon + whiteFontClasses}
                                    >
                                        {prop.icon}
                                    </Icon>
                                ) : (
                                        <prop.icon
                                            className={classes.itemIcon + whiteFontClasses}
                                        />
                                    )}
                                <ListItemText
                                    primary={prop.name}
                                    className={classes.itemText + whiteFontClasses}
                                    disableTypography={true}
                                />
                            </ListItem>
                        </NavLink>
                    );
                })}
            </List>
        );
        const image = undefined;
        return (
            <div>
                <Drawer
                    variant="permanent"
                    anchor="left"
                    classes={{
                        paper: classes.drawerPaper
                    }}


                >
                    <div className={classes.imageContainer}>
                        <img
                            alt="logo"
                            className={classes.image}
                            src="/logo512.png"
                        />
                    </div>
                    <Divider />
                    <div className={classes.sidebarWrapper}>

                        {links}
                    </div>

                    <div
                        className={classes.background}

                    />

                </Drawer>
            </div>


        );
    }
}
export default withStyles(sidebarStyle)(Sidebar);