import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    Grid,
    TextField,
    Button,
    Switch,
    FormControlLabel
} from '@material-ui/core';
import { createUser, editUser } from '../services/service-calls';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        padding: "15px"
    },
    formInput: {
        marginBottom: "30px"
    },
    dialogContent: {
        overflowY: "visible"
    },
    dialogHeader: {
        '& h2': { width: "500px" }
    }
});
class UserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: "",
            name: "",
            password: "",
            confirmPassword: "",
            passError: false,
            is_admin: false
        }
        this.userJson = new Object();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) && Object.keys(this.props.user).length > 0) {
            const { id, ...rest } = this.props.user;
            this.setState({ ...rest, confirmPassword: this.props.user.password })
        }
        console.log(this.props);
    }

    setOpen = (value) => {
        this.setState({ open: value });
    }
    handleClickOpen = () => {
        this.setOpen(true);
    };

    handleClose = () => {
        this.setState({
            user_name: "",
            name: "",
            password: "",
            confirmPassword: "",
            passError: false,
            is_admin: false
        });
        this.userJson = new Object();
        this.props.handleClose();
    };
    handleSubmitData = () => {
        if (!Object.keys(this.props.user).length > 0) {
            if ((!this.userJson.hasOwnProperty('user_name') || (this.userJson.user_name == "")) || (!this.userJson.hasOwnProperty('name') || (this.userJson.name == "")) || (!this.userJson.hasOwnProperty('password') || (this.userJson.password == ""))) {
                return alert('The fields User Name,Name,Password cannot be empty');
            }
        }
        if (Object.keys(this.props.user).length > 0) {
            editUser({ ...this.userJson, user_id: this.props.user.user_id }, () => { window.location.reload(); }, this.handleClose);
        } else createUser({ ...this.userJson, is_admin: this.state.is_admin }, () => { window.location.reload(); }, this.handleClose);
    }
    handleSwitchChange = (event) => {
        this.setState({ is_admin: event.target.checked });
        this.userJson['is_admin'] = event.target.checked;
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value.trim() });
        if (event.target.name !== "confirmPassword") this.userJson[event.target.name] = event.target.value.trim();
    }
    handleSubmit = () => {
        const { password, confirmPassword } = this.state;
        password !== confirmPassword ? (this.setState({ passError: true })) : (this.handleSubmitData());
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
                    <div className={classes.root}>
                        <DialogTitle className={classes.dialogHeader} id="form-dialog-title">{Object.keys(this.props.user).length > 0 ? 'Update User' : 'Add User'}
                        </DialogTitle>
                        <DialogContent className={classes.dialogContent}>

                            <Grid
                                container
                                spacing={4}
                            >
                                <Grid
                                    item
                                    sm={6}
                                >
                                    <TextField className={classes.formInput} fullWidth label="UserName" name="user_name" value={this.state.user_name}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        error={this.state.passError}
                                        helperText={this.state.passError ? "Password does not Match." : ""}
                                        label="Password"
                                        type="password"
                                        autoComplete="new-password"
                                        className={classes.formInput}
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />



                                </Grid>

                                <Grid
                                    item
                                    sm={6}
                                >
                                    <TextField className={classes.formInput} fullWidth label="Name" name="name" value={this.state.name}
                                        onChange={this.handleChange}
                                    />

                                    <TextField
                                        fullWidth
                                        error={this.state.passError}
                                        helperText={this.state.passError ? "Password does not Match." : ""}
                                        label="Re-Enter Password"
                                        type="password"
                                        autoComplete="new-password"
                                        className={classes.formInput}
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleChange}
                                    />
                                    <FormControlLabel
                                        control={<Switch
                                            checked={this.state.is_admin}
                                            onChange={this.handleSwitchChange}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                        />}
                                        label="Admin"
                                        className={classes.formInput}
                                    />

                                </Grid>

                            </Grid>

                        </DialogContent>
                        <DialogActions>
                            <Grid
                                container
                                justify="space-between"
                            >
                                <Button variant="contained" onClick={this.handleSubmit} color="primary">
                                    Save
                     </Button>
                                <Button variant="contained" onClick={this.handleClose} color="secondary">
                                    Cancel
                     </Button>
                            </Grid>

                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(UserModal);