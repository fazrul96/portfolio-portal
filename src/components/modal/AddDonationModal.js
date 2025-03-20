import React, {useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import FloatingActionButton from "../common/button/FloatingActionButton";

const AddDonationModal = () => {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        nric: '',
        donation: 0,
        date: '',
        address: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Show modal when FAB is clicked
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // Simulate submitting the form (you can replace this with real API calls)
    const handleSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('Donation Added:', formData);
            setIsLoading(false);
            handleCloseModal();
        }, 2000);
    };

    return (
        (<Box sx={{ flexGrow: 1, padding: 2 }}>
            {/* Floating Action Button */}
            <FloatingActionButton onClick={handleOpenModal} label="Add New Donation" />

            {/* Modal with a simple form */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Add New Donation</DialogTitle>
                <DialogContent>
                    {/* Form inside the dialog */}
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="NRIC"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="nric"
                        value={formData.nric}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Donation Amount"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="donation"
                        type="number"
                        value={formData.donation}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        slotProps={{
                            inputLabel: { shrink: true }
                        }}
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                    </Button>
                    <Button onClick={handleCloseModal} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>)
    );
};

export default AddDonationModal;
