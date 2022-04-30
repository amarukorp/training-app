import { useState, useEffect, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Addcustomer from './Addcustomer';
import Snackbar from '@mui/material/Snackbar';
import { Alert, IconButton, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';

function Customerlist(){
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const gridRef = useRef();

    useEffect(()=>{
        fetchCustomers()
    },[])

    const fetchCustomers =()=>{
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response=> response.json())
        .then(data=> setCustomers(data.content))
        .catch(err=>console.error())
    }
    
    const addCustomer = (newCustomer) => {
      fetch("https://customerrest.herokuapp.com/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      }).then((response) => {
        if (!response.ok) {
          alert("Something went wrong adding the customer");
        } else {
          setMessage("Customer successfully added!");
          fetchCustomers();
          setOpen(true);
        }
      });
    };
    const deleteCustomer = (link) => {
      if (
        window.confirm(
          "Are you sure? All trainings will be deleted with customer information!"
        )
      ) {
        fetch(link, { method: "DELETE" }).then((response) => {
          if (!response.ok) {
            alert("something went wrong deleting the customer");
          } else {
            setMessage("Customer successfully deleted!");
            setOpen(true);
            fetchCustomers();
          }
        });
      }
    };

    const updateCustomer= (updatedCustomer, link)=>{
        fetch(link,{
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(updatedCustomer)
        })
        .then(response=> {
            if(!response.ok){
                alert('Something went wrong updating the customer, please try again')
            }
            else{
                setMessage('Customer successfully updated')
                setOpen(true)
                fetchCustomers()
            }
        })
        .catch(err=>console.error(err))
    }
    const addTraining= (training)=>{
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(training)
        })
        .then(response=>{
            if(!response.ok){
                alert('Something went wrong adding training')
            }
            else{
                setMessage('Training successfully added')
                setOpen(true)
            }
        })
        .catch(err=>console.error(err))
    }

    const onBtExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv({fileName:'Customers Information'});
    }, []);
    
    const [columns] = useState([
        {field: 'firstname', sortable:true, filter:true, width:140},
        {field: 'lastname', sortable:true, filter:true, width:140},
        {field: 'streetaddress', headerName:'Street Address', sortable:true, filter:true},
        {field: 'postcode', sortable:true, filter:true, width:120},
        {field: 'city', sortable:true, filter:true, width:120},
        {field: 'email', sortable:true, filter:true, width:140},
        {field: 'phone', sortable:true, filter:true},
        {
            field:'links.0.href',
            headerName:'Add training',
            width:120,
            cellRenderer: params=><Addtraining params={params} addTraining={addTraining}/>
        },
        {
            field:'links.0.href',
            headerName:'',
            width:60,
            cellRenderer: params => <Editcustomer params={params} updateCustomer={updateCustomer}/>
        },
        {
            field:'links.0.href',
            headerName:'',
            width:60,
            cellRenderer: params =>
            <IconButton color='error' onClick={()=> deleteCustomer(params.value)}>
                <DeleteIcon/>
            </IconButton>
         }
    ])

 
    return (
      <>
        <div
          className="ag-theme-material"
          style={{ height: 600, width: "90%", marginLeft: 90 }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
            spacing={2}
          >
            <Addcustomer addCustomer={addCustomer} />
            <Button
              variant="contained"
              onClick={onBtExport}
              style={{ position: "relative", marginTop: 8, marginLeft: -400 }}
            >
              Export to Csv
            </Button>
          </Stack>
          <AgGridReact
            ref={gridRef}
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}
          ></AgGridReact>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </>
    );   
}
export default Customerlist