import React, { useState } from 'react';
import { Button, Dialog } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, AlertTitle } from '@mui/material';


const DeleteButton = ( props ) => {
	const {id, collection} = props;
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	const handleDelete = async () => {
		try {
			await axios.post(`/api/data/${collection}/deleteOne/${id}`,  {id: id});
			handleClose();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<DeleteIcon onClick={handleOpen}/>
			<Dialog open={isOpen} onClose={handleClose} severity="warning">
				<Alert sx={{ backgroundColor: 'white', color: 'black' }} open={isOpen} onClose={handleClose} severity="warning">
					<AlertTitle>Delete Item?</AlertTitle>
					<p>
                        Are you sure you want to permanently delete this item from the database?
					</p>
					<p>
                        (If you are unsure about deleting this item, we recommend taking a backup of the database before
                        applying any changes.)
					</p>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleDelete} color="error" autoFocus>
                            Delete
						</Button>
					</div>
				</Alert>
			</Dialog>
		</>
	);
};

export default DeleteButton;
