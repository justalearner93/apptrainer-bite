import React, { useState, useEffect } from "react";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Moment from "react-moment";
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

function TrainingList() {
    const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);

    const fetchTraining = () => {
        fetch(process.env.REACT_APP_API_GETTRAINING)
        .then(response => response.json())
        .then(data =>setTraining(data))
        .catch(err => console.error(err))
    }
    useEffect (() => {
        fetchTraining();
    }
    )

    const deleteTraining = (id) => {
        if (window.confirm("Are you sure?")) {
            fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {
                method: "DELETE"})
                .then (response => {
                    if (!response.ok) {
                    alert ("Something went wrong!");
                }
                    else {
                    setOpen(true);
                    fetchTraining();
                    }
                })
                .catch (err => console.error(err));
        }
    }
    
    const [columns] = useState([
        {field:"id", sortable:true},
        {field:"", 
        cellRenderer: rowData => 
        <IconButton color="error" onClick={() => deleteTraining(rowData.id)}><DeleteIcon/></IconButton>,
        width: 100 },

        {field:"date", 
        sortable: true, 
        filter: true,
        cellRenderer: (params) => (   
                     
            <Moment  format="DD/MM/YYYY HH:mm" >{params.data.date}</Moment>
        )

        },
        {field:"duration", sortable: true, filter: true},
        {field:"activity", sortable: true, filter: true},
        {field:"Customer", 
        sortable: true,
        cellRenderer: (row) => (
            <span>{row.data.customer.firstname + " " + row.data.customer.lastname}</span>
        ) },
    ]);
    return (
        <>
        
         <div className="ag-theme-material" style={{height: 800, width: '90%'}}>
         <AgGridReact
            columnDefs={columns}
            rowData={training}
            pagination={true}
            paginationPageSize={12}
            suppressCellFocus={true}
            
         />
         <Snackbar
        open ={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message = "Training deleted successfully"
        
      />
         </div>
        </>
      );


}
export default TrainingList;