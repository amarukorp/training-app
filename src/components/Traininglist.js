import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { format, parseISO } from 'date-fns';

function Traininglist () {
    const [trainings, setTrainings] = useState([]);

    useEffect(()=>{
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response=> response.json())
        .then(data=> setTrainings(data))
        .catch(err=>console.error())
    },[])
    
    const [columns] = useState([
        {field: 'activity', sortable:true, filter:true},
        {field:'date', sortable:true, filter:true, valueFormatter: params => format(parseISO(params.value), "dd.MM.yyyy.p")},
        {field: 'duration', sortable:true, filter:true},
        {field: 'fullname', headerName:'Customer', sortable:true, filter:true,
        valueGetter(params){return params.data.customer.firstname +' '+ params.data.customer.lastname}, supressMenu:true,
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
      </div>
    );
}

export default Traininglist