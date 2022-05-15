import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Addcustomer ({ addCustomer}) {
    const [open, setOpen] = useState(false);
    
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress:'',
        postcode:'',
        city:'',
        email:'',
        phone: ''
    });
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
        addCustomer(customer);
        setCustomer({
            firstname: '',
            lastname: '',
            streetaddress:'',
            postcode:'',
            city:'',
            email:'',
            phone: ''
    })
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    }
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen} style= {{marginTop: 10}}>
          Add Customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new customer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter new customer information
            </DialogContentText>
           
            <TextField
            margin="dense"
            name = "firstname"
            value = {customer.firstname}
            onChange={inputChanged}
            label="First name"
            fullWidth
            variant="standard"
            />

            <TextField
            margin="dense"
            name = "lastname"
            value = {customer.lastname}
            onChange={inputChanged}
            label="Last Name"
            fullWidth
            variant="standard"
            />
            <TextField
            margin="dense"
            name = "streetaddress"
            value = {customer.streetaddress}
            onChange={inputChanged}
            label="Street address"
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            name = "postcode"
            value = {customer.postcode}
            onChange={inputChanged}
            label="Post code"
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            name = "city"
            value = {customer.city}
            onChange={inputChanged}
            label="City"
            fullWidth
            variant="standard"
            />
             <TextField
            margin="dense"
            name = "email"
            value = {customer.email}
            onChange={inputChanged}
            label="Email"
            fullWidth
            variant="standard"
            />
            <TextField
            margin="dense"
            name = "phone"
            value = {customer.phone}
            onChange={inputChanged}
            label="Phone number"
            fullWidth
            variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default Addcustomer;