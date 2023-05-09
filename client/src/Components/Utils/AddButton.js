import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function AddButton(collection) {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const [dataset, setDataset] = useState({});
	const [publications, setPublications] = useState({});
	const [presentations, setPresentations] = useState({});
	const [member, setMember] = useState({});
	const [social, setSocial] = useState({});
	const [position, setPosition] = useState({});
	// const [research, setResearch] = useState({});

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmit = async () => {
		const item = {};
		try {
			await axios.post(`/api/data/${collection}/addOne`, { newItem: item });
			handleClose();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Button variant="outlined" onClick={handleOpen}>
				<AddIcon />
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{`Add a new ${collection}`}</DialogTitle>
				<DialogContent>
					<TextField
						label="Title"
						variant="outlined"
						fullWidth
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
					<TextField
						label="Description"
						variant="outlined"
						fullWidth
						value={description}
						onChange={(event) => setDescription(event.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default AddButton;
