import React from "react";
import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function Editcustomer({ params, updateCustomer}){
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({

        firstname:'',
        lastname:'',
        email:'',
        phone:'',
        streetaddress:'',
        postcode:'',
        city:''
    });
    const handleClickOpen=()=>{
        setCustomer({
            firstname:params.data.firstname,
            lastname:params.data.lastname,
            email:params.data.email,
            phone:params.data.phone,
            streetaddress:params.data.streetaddress,
            postcode:params.data.postcode,
            city:params.data.city
        })
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
      };
      const handleSave = () => {
        updateCustomer(customer, params.value);
        setOpen(false);
    }

    const inputChanged = (event)=>{
        setCustomer({...customer, [event.target.name]:event.target.value})
    }  

    return (
      <>
        <IconButton variant="contained" onClick={handleClickOpen}>
          <EditIcon/>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please edit customer information
            </DialogContentText>
            <TextField
              name="firstname"
              value={customer.firstname}
              onChange={inputChanged}
              label="Firstname"
              fullWidth
              variant="standard"
            />
            <TextField
              name="lastname"
              value={customer.lastname}
              onChange={inputChanged}
              label="Lastname"
              fullWidth
              variant="standard"
            />
            <TextField
              name="email"
              value={customer.email}
              onChange={inputChanged}
              label="Email"
              fullWidth
              variant="standard"
            />
            <TextField
              name="phone"
              value={customer.phone}
              onChange={inputChanged}
              label="Phone Number"
              fullWidth
              variant="standard"
            />
            <TextField
              name="streetaddress"
              value={customer.streetaddress}
              onChange={inputChanged}
              label="Street Address"
              fullWidth
              variant="standard"
            />
            <TextField
              name="postcode"
              value={customer.postcode}
              onChange={inputChanged}
              label="Postal code"
              fullWidth
              variant="standard"
            />
            <TextField
              name="city"
              value={customer.city}
              onChange={inputChanged}
              label="City"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </>
    );
}
export default Editcustomer