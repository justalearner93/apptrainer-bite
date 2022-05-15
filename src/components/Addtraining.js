import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Addtraining(props) {
	const [open, setOpen] = useState(false);
	const [training, setTraining] = useState({
		activity: "",
		date: "",
		duration: "",
		customer: props.customerId
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleInputChange = event => {
		setTraining({ ...training, [event.target.name]: event.target.value });
	};

	const addTraining = () => {
		console.log(training);
		props.saveTraining(training);
		handleClose();
	};

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				size="small"
				onClick={handleClickOpen}
			>
				+
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Add New Training</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						name="activity"
						value={training.activity}
						onChange={e => handleInputChange(e)}
						label="Activity"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="date"
						value={training.date}
						onChange={e => handleInputChange(e)}
						label="Date"
						fullWidth
					/>
					<TextField
						margin="dense"
						name="duration"
						value={training.duration}
						onChange={e => handleInputChange(e)}
						label="Duration"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={addTraining} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}