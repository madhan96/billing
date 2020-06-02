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
import { withStyles } from '@material-ui/core/styles';
import { postProducts, editProducts } from '../services/service-calls';

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
    },
    imageContainer: {
        height: 250,
        width: '350px',
        margin: '0px auto 30px',
        border: `1px solid #9e9e9e`,
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
});
class ProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: "",
            price: 0,
            in_stock: 0,
            image_file: null,
            brand: "",
            imagePreviewUrl: '',
            fileError: false
        }
        this.userData = new FormData();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((JSON.stringify(prevProps.product) !== JSON.stringify(this.props.product)) && Object.keys(this.props.product).length > 0) {
            const { image, id, ...rest } = this.props.product;
            this.setState({ ...rest })
        }
        console.log(this.props);
    }

    handleClose = () => {
        this.setState({
            product_name: "",
            price: 0,
            in_stock: 0,
            image_file: null,
            brand: "",
            imagePreviewUrl: '',
            fileError: false
        });
        this.userData = new FormData();
        this.props.handleClose();
    };

    handleChange = (event) => {
        let value = event.target.value
        if (event.target.name === "in_stock" || event.target.name === "price") {
            value = String(value).replace(new RegExp("[^0-9]"), "");
        } else {
            value = value.trim();
        }
        this.userData.set(event.target.name, value);
        this.setState({ [event.target.name]: value });
    }
    handleSend = () => {
        if (!Object.keys(this.props.product).length > 0) {
            if ((!this.userData.has('product_name') || (this.userData.get('product_name') == "")) || (!this.userData.has('price') || (this.userData.get('price') == "")) || (!this.userData.has('in_stock') || (this.userData.get('in_stock') == "")) || ((this.userData.get('brand') == "") || (!this.userData.has('brand')))) {
                return alert('The fileds Product Name,Price,Brand,Stock cannot be empty');
            }
        }
        if (Object.keys(this.props.product).length > 0) {
            if (this.userData.has('image') && !this.userData.has('product_name')) {
                this.userData.set('product_name', this.state.product_name);
            }
            this.userData.set('id', this.props.product.id);
            return editProducts(this.userData, () => { window.location.reload(); });
        }
        console.log(this.userData);
        postProducts(this.userData, () => { window.location.reload(); });

    }
    handleSubmit = () => {
        const { password, confirmPassword } = this.state;
        password !== confirmPassword ? (this.setState({ passError: true })) : (this.handleSend());
    }
    handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        if (file.size > 51200) return this.setState({ fileError: true })
        reader.onloadend = () => {
            this.setState({
                image_file: file,
                imagePreviewUrl: reader.result
            });
            this.userData.set('image', file);
        }

        reader.readAsDataURL(file)
    }
    render() {
        const { classes } = this.props;
        return (
            <div>

                <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
                    <div className={classes.root}>
                        <DialogTitle className={classes.dialogHeader} id="form-dialog-title">{Object.keys(this.props.product).length > 0 ? 'Update Product' : 'Add Product'}
                        </DialogTitle>
                        <DialogContent className={classes.dialogContent}>
                            <Grid
                                container
                                direction="column"
                            >
                                <Grid
                                    container
                                    item
                                    justify="center"
                                >
                                    <div className={classes.imageContainer}>
                                        {this.state.imagePreviewUrl ? (<img
                                            alt="Product"
                                            className={classes.image}
                                            src={this.state.imagePreviewUrl}>
                                        </img>)
                                            : this.props.product.image ? (<img
                                                alt="Product"
                                                className={classes.image}
                                                src={`http://localhost:5000/images/${this.props.product.product_name}/${this.props.product.image}`}>
                                            </img>) :
                                                (<div className="previewText">Please select an Image for Preview</div>)}
                                    </div>
                                    <TextField className={classes.formInput} type="file"
                                        size='small'
                                        variant="outlined"
                                        error={this.state.fileError}
                                        helperText={this.state.fileError ? "File size should be less than 50kb." : ""}
                                        onChange={this.handleImageChange}
                                    />

                                </Grid>

                                <Grid
                                    item
                                    container
                                    spacing={4}
                                >
                                    <Grid
                                        item
                                        sm={6}
                                    >
                                        <TextField className={classes.formInput} fullWidth label="ProductName" name="product_name" value={this.state.product_name}
                                            onChange={this.handleChange}
                                        />
                                        <TextField className={classes.formInput} fullWidth type="number" label="Price" name="price" value={this.state.price}
                                            onChange={this.handleChange}
                                        />




                                    </Grid>

                                    <Grid
                                        item
                                        sm={6}
                                    >


                                        <TextField className={classes.formInput} fullWidth label="Brand" name="brand" value={this.state.brand}
                                            onChange={this.handleChange}
                                        />

                                        <TextField className={classes.formInput} type="number" fullWidth label="Stock" name="in_stock" value={this.state.in_stock}
                                            onChange={this.handleChange}
                                        />

                                    </Grid>

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

export default withStyles(styles)(ProductModal);