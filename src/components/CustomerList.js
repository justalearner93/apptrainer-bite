import React, { useState, useEffect } from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import Addtraining from './Addtraining';



function CustomerList() {
    const [customer, setCustomer] = useState([]);
    const [open, setOpen] = useState(false);

    const fetchCustomer = () => {
        fetch(process.env.REACT_APP_API_CUSTOMER)
        .then (response => response.json())
        .then(data => setCustomer(data.content))
        .catch(err => console.error(err))
    }
    
    const addCustomer = (newCustomer) => {
        fetch(process.env.REACT_APP_API_CUSTOMER, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newCustomer)
        })
        .then (response => {
            if (response.ok) {
                fetchCustomer();
            }
            else {
                alert('Something went wrong!')
            }
        })
        .catch(err => console.error(err))
    }
    
    const deleteCustomer = (link) => {
        if (window.confirm("Are you sure?")) {
        fetch (link, {method: "DELETE"})
        .then (response => {
            if (!response.ok) {
            alert ("Something went wrong!");
        }
            else {
            setOpen(true);
            fetchCustomer();
            }
        })
        .catch (err => console.error(err));
    }
    }
    
    const updateCustomer = (updatedCustomer) => {
        fetch(process.env.REACT_APP_API_CUSTOMER, 
        {method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedCustomer)
    })
        .then(response => {
            if (response.ok) {
                fetchCustomer();
            }
            else {
                alert("Something went wrong!");
            }
        })
        .catch(err =>console.error(err));
    }

    const saveTraining = (training) => {
		fetch("https://customerrest.herokuapp.com/api/trainings", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(training)
		})
			.then(response => {
                if (response.ok) {
                    fetchCustomer();
                }
                else {
                    alert("Something went wrong!");
                }
            })
            .catch(err =>console.error(err));
        }


useEffect (() => {
    fetchCustomer();
}
)

const [columns] = useState([
    {field:"firstname", sortable: true, filter: true, width: 120},
    {field:"lastname", sortable: true, filter: true, width: 120},
    {field:"streetaddress", sortable: true, filter: true, width: 200},
    {field:"postcode", sortable: true, filter: true, width: 120},
    {field:"city", sortable: true, filter: true, width: 150},
    {field:"email", sortable: true, filter: true},
    {field:"phone", sortable: true, filter: true, width: 150},
    {
        headerName:'',
        width: 100,
        field: "links[0].href",
        cellRenderer: params => <Editcustomer params={params} updateCustomer={updateCustomer}/>

    },
    {   
        headerName: "",
        field: "links[0].href",
        cellRenderer: params => 
        <IconButton color="error" onClick={() => deleteCustomer(params.value)}><DeleteIcon/></IconButton>,
        width: 100 },
    {
        headerName:"Add training",
        width: 120,
        cellRenderer: params => 
        <Addtraining params={params} saveTraining={saveTraining} />
    }
]);



return (
    <>
    <Addcustomer addCustomer ={addCustomer} />
     <div className="ag-theme-material" style={{height: 800, width: '90%'}}>
     <AgGridReact
        columnDefs={columns}
        rowData={customer}
        pagination={true}
        paginationPageSize={12}
        suppressCellFocus={true}
        paginationAutoPageSize={true}
       
     />
    <Snackbar
        open ={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message = "Customer deleted successfully"
        
      />
     </div>
    </>
  );
}

export default CustomerList;