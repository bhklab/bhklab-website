import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = ({ id, collection }) => {
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
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Delete Item?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this item? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteButton;
