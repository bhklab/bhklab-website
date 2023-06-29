// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import TextField from '@mui/material/TextField';
// import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';

function EditButton({ item }) {
	// const [open, setOpen] = useState(false);
	// const [title, setTitle] = useState(item.title||'');
	// const [description, setDescription] = useState(item.description || '' );
	//
	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);
	//
	// const handleSubmit = async () => {
	//     try {
	//         await axios.post('/api/items', { title, description });
	//         handleClose();
	//     } catch (error) {
	//         console.error(error);
	//     }
	// };
	//
	// return (
	//     <>
	//         <EditIcon onClick={handleOpen}/>
	//         <Dialog open={open} onClose={handleClose}>
	//             <DialogTitle>Edit Item</DialogTitle>
	//             <DialogContent>
	//                 <TextField
	//                     label="Title"
	//                     variant="outlined"
	//                     fullWidth
	//                     value={title}
	//                     onChange={(event) => setTitle(event.target.value)}
	//                 />
	//                 <TextField
	//                     label="Description"
	//                     variant="outlined"
	//                     fullWidth
	//                     value={description}
	//                     onChange={(event) => setDescription(event.target.value)}
	//                 />
	//             </DialogContent>
	//             <DialogActions>
	//                 <Button onClick={handleClose}>Cancel</Button>
	//                 <Button onClick={handleSubmit}>Save</Button>
	//             </DialogActions>
	//         </Dialog>
	//     </>
	// );
	return (
		<EditIcon />
	);
}

export default EditButton;
