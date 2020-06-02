import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle, DialogContentText } from '@material-ui/core';
import { deleteProduct, deleteUser } from '../services/service-calls'
import {
    Grid,
    Button
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

class DeleteModal extends Component {
    constructor(props) {
        super(props);
    }

    handleCloseModal = () => {
        if (this.props.record === 'product') {
            const { id } = this.props.product;
            deleteProduct({ id }, () => { window.location.reload(); }, this.props.handleClose);
        } else {
            const userId = this.props.user.user_id;
            deleteUser({ userId }, () => { window.location.reload(); }, this.props.handleClose);
        }
    };

    handleSubmit = () => {
        this.handleCloseModal();
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

                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete the record ?
                            </DialogContentText>

                        </DialogContent>
                        <DialogActions>
                            <Grid
                                container
                                justify="space-between"
                            >
                                <Button variant="contained" onClick={this.handleSubmit} color="primary">
                                    delete
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
export default withStyles(styles)(DeleteModal);