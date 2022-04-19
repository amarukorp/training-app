import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

function Customerlist(){
    const [customers, setCustomers] = useState([]);

    useEffect(()=>{
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response=> response.json())
        .then(data=> setCustomers(data.content))
        .catch(err=>console.error())
    },[])
    
   
    const [columns] = useState([
        {field: 'firstname', sortable:true, filter:true, width:140},
        {field: 'lastname', sortable:true, filter:true},
        {field: 'streetaddress', headerName:'Street Address', sortable:true, filter:true},
        {field: 'postcode', sortable:true, filter:true},
        {field: 'city', sortable:true, filter:true},
        {field: 'email', sortable:true, filter:true},
        {field: 'phone', sortable:true, filter:true}
    ])
   
    return(
        <div className="ag-theme-material" style={{height: 650, width:'90%', marginLeft:90}}>
        <AgGridReact
            rowData={customers}
            columnDefs={columns}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}>
        </AgGridReact>
     </div>
        
    )   
}
export default Customerlist