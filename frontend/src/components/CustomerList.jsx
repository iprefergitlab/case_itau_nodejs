import React, { useEffect, useState } from 'react';
import { getCustomers, deleteCustomer } from '../services/api';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const navigate = useNavigate();

    const fetchCustomers = () => {
        getCustomers().then(res => setCustomers(res.data)).catch(console.error);
    };

    useEffect(() => { fetchCustomers(); }, []);

    const handleDeleteClick = (id) => {
        setToDelete(id);
        setOpenConfirm(true);
    };

    const confirmDelete = () => {
        deleteCustomer(toDelete).then(() => {
            fetchCustomers();
            setOpenConfirm(false);
        }).catch(console.error);
    };

    return (
        <>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="h5">Customers</Typography>
                <Button variant="contained" component={RouterLink} to="/customers/new">Add Customer</Button>
            </Stack>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map(c => (
                            <TableRow key={c.id}>
                                <TableCell>{c.name}</TableCell>
                                <TableCell>{c.email}</TableCell>
                                <TableCell>${c.balance.toFixed(2)}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" component={RouterLink} to={`/customers/${c.id}`}><VisibilityIcon /></IconButton>
                                    <IconButton color="secondary" component={RouterLink} to={`/customers/${c.id}/edit`}><EditIcon /></IconButton>
                                    <IconButton color="error" onClick={() => handleDeleteClick(c.id)}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                <DialogTitle>Delete Customer?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this customer? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
                    <Button color="error" onClick={confirmDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
