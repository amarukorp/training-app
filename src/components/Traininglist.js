import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { format, parseISO } from 'date-fns';
import { Alert, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';



function Traininglist () {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(()=>{
      fetchTrainings()
    },[])
    
    const fetchTrainings =()=>{
      fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response=> response.json())
        .then(data=> setTrainings(data))
        .catch(err=>console.error())
    }

    const deleteTraining = (id) => {
      if (
        window.confirm(
          "Are you sure? All information about this training will be deleted!"
        )
      ) {
        fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, 
        { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            alert("something went wrong deleting the training");
          } else {
            fetchTrainings();
            setMessage("Training successfully deleted!");
            setOpen(true);
            
          }
        });
      }
    };
    
    const [columns] = useState([
        {field: 'activity', sortable:true, filter:true},
        {field:'date', sortable:true, filter:true, valueFormatter: params => format(parseISO(params.value), "dd.MM.yyyy.p")},
        {field: 'duration', sortable:true, filter:true},
        {field: 'fullname', headerName:'Customer', sortable:true, filter:true,
        valueGetter(params){return params.data.customer.firstname +' '+ params.data.customer.lastname}, suppressMenu:true,
        },
        {
          field:'id',
          headerName:'',
          width:60,
          cellRenderer: params =>
          <IconButton color='error' onClick={()=> deleteTraining(params.value)}>
              <DeleteIcon/>
          </IconButton>
       }
    ])


    return (
      <div
        className="ag-theme-material"
        style={{ height: 600, width: "90%", marginLeft: 90 }}
      >
        <AgGridReact
         rowData={trainings} 
         columnDefs={columns}
         pagination={true}
         paginationPageSize={10}
         suppressCellFocus={true}>
        </AgGridReact>
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
      </div>
    );
}

export default Traininglist