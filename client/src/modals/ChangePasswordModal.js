import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getItem } from '../utils/localStorage';
import { passwordService } from '../services/service-calls'
import {
    Grid,
    TextField, Button
} from '@material-ui/core';
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
    }

});

class ChangePasswordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

            password: "",
            confirmPassword: "",
            passError: false,
        }

    }

    handleCloseModal = () => {
        let { password } = this.state;
        let userId = getItem('USER_ID');
        passwordService({ password, userId }, this.props.handleClose, this.props.handleClose);
        this.setState({
            password: "",
            confirmPassword: "",
            passError: false,
        });
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value.trim() });
    }
    handleSubmit = () => {
        const { password, confirmPassword } = this.state;
        password !== confirmPassword ? (this.setState({ passError: true })) : (this.handleCloseModal());
    }

    render() {
        const { classes } = this.props;
        return (
            <div>

                <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title" >
                    <div className={classes.root}>
                        <DialogTitle id="form-dialog-title">Change Password
                        </DialogTitle>
                        <DialogContent className={classes.dialogContent}>

                            <Grid
                                container
                                spacing={4}
                                direction="column"
                                alignItems="center"
                            >
                                <Grid
                                    item
                                    sm={6}
                                >

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
                                <Button variant="contained" onClick={this.props.handleClose} color="secondary">
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
export default withStyles(styles)(ChangePasswordModal);