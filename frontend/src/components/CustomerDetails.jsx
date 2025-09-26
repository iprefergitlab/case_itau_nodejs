import React, { useEffect, useState } from 'react';
import { getCustomer, deposit, withdraw } from '../services/api';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Typography, Paper, Box, Button,
    TextField, Stack
} from '@mui/material';

export default function CustomerDetails() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [amount, setAmount] = useState('');
    const [mode, setMode] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getCustomer(id).then(res => setCustomer(res.data)).catch(console.error);
    }, [id]);

    const handleOperation = () => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            alert('Please enter a valid positive amount.');
            return;
        }
        if (mode === 'withdraw' && Number(amount) > customer.balance) {
            alert('Insufficient funds.');
            return;
        }
        const action = mode === 'deposit' ? deposit : withdraw;
        action(id, Number(amount))
            .then(() => {
                alert(`${mode === 'deposit' ? 'Deposit' : 'Withdraw'} successful.`);
                getCustomer(id).then(res => setCustomer(res.data));
                setAmount('');
                setMode(null);
            })
            .catch(err => alert(err.response?.data?.error || err.message));
    };

    if (!customer) return <Typography>Loading...</Typography>;

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>{customer.name}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>Email: {customer.email}</Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>Balance: ${customer.balance.toFixed(2)}</Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button variant="outlined" onClick={() => setMode('deposit')}>Deposit</Button>
                <Button variant="outlined" onClick={() => setMode('withdraw')}>Withdraw</Button>
                <Button variant="contained" component={RouterLink} to={`/customers/${id}/edit`}>Edit</Button>
                <Button variant="text" onClick={() => navigate('/customers')}>Back to list</Button>
            </Stack>

            {mode && (
                <Box sx={{ mt: 2 }}>
                    <TextField
                        label="Amount"
                        fullWidth
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <Button variant="contained" sx={{ mt: 1 }} onClick={handleOperation}>
                        {mode === 'deposit' ? 'Deposit' : 'Withdraw'}
                    </Button>
                </Box>
            )}
        </Paper>
    );
}
