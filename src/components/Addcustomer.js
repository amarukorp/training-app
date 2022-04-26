import React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

function Addcustomer({ addCustomer }){
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
    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
      };

    const handleSave = () => {
        addCustomer(customer)
        setCustomer({
            firstname:'',
            lastname:'',
            email:'',
            phone:'',
            streetaddress:'',
            postcode:'',
            city:''
        })
        setOpen(false)
    }
    const inputChanged = (event)=>{
        setCustomer({...customer, [event.target.name]:event.target.value})
    }  
    return(
        <div>
            <Button variant="contained" onClick={handleClickOpen} style={{position:'relative', marginTop:8, marginLeft:-1000}}>
                New Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter customer information
                    </DialogContentText>
                    <TextField
                        name='firstname'
                        value={customer.firstname}
                        onChange={inputChanged}
                        label="Firstname"
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        name='lastname'
                        value={customer.lastname}
                        onChange={inputChanged}
                        label="Lastname"
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        name='email'
                        value={customer.email}
                        onChange={inputChanged}
                        label="Email"
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        name='phone'
                        value={customer.phone}
                        onChange={inputChanged}
                        label="Phone Number"
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        name='streetaddress'
                        value={customer.streetaddress}
                        onChange={inputChanged}
                        label="Street Address"
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        name='postcode'
                        value={customer.postcode}
                        onChange={inputChanged}
                        label="Postal code"
                        fullWidth
                        variant='standard'
                    />
                    <TextField
                        name='city'
                        value={customer.city}
                        onChange={inputChanged}
                        label="City"
                        fullWidth
                        variant='standard'
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>       
        </div>
    )
}

export default Addcustomer