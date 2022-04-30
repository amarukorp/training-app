import React from "react"
import { useState } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { formatISO } from 'date-fns';


function Addtraining({ params, addTraining}){
    const [open, setOpen] = useState(false);
    const [trainings, setTrainings] = useState({
      date: "",
      activity: "",
      duration: "",
      customer: "",
    });
    const [date, setDate] = useState(new Date());

  const handleClickOpen = () => {
    
    setTrainings({ ...trainings, customer: params.value });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange=(event)=>{
    setTrainings({...trainings, [event.target.name]:event.target.value})
  }
  const handleTime = (newDate)=>{
   
    setTrainings({...trainings, date: formatISO(newDate)})
    setDate(newDate)
  }
  const handleSave = ()=>{

    addTraining(trainings);
    setOpen(false);
    
  }

    return(
        <>
        <IconButton variant="contained" onClick={handleClickOpen}>
          <AddIcon/>
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New training</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please add the information of the new training
            </DialogContentText>
            <Stack spacing={3}>
            <TextField 
              name='activity'
              value={trainings.activity}
              onChange={handleChange}
              label="Activity"
              variant="standard"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
      
             <DateTimePicker
              label="Date"
              value={date}
              onChange={handleTime}
              renderInput={(params) => <TextField {...params} />}
             />
            </LocalizationProvider>
            <TextField
              name='duration'
              value={trainings.duration}
              onChange={handleChange}
              label="Duration"
              variant="standard"
              fullWidth
            />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
        </>
    )
}

export default Addtraining