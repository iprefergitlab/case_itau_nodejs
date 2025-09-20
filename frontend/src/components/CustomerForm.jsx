import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createCustomer, getCustomer, updateCustomer } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

export default function CustomerForm() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (isEdit) {
            getCustomer(id).then(res => {
                const { name, email } = res.data;
                reset({ name, email });
            });
        } else {
            reset({ name: '', email: '' });
        }
    }, [id, isEdit, reset]);

    const onSubmit = (data) => {
        if ('id' in data) delete data.id;
        (isEdit ? updateCustomer(id, data) : createCustomer(data))
            .then(() => navigate('/customers'))
            .catch(err => alert(err.response?.data?.error || err.message));
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                {isEdit ? 'Edit Customer' : 'Add Customer'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Minimum 2 characters' } })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    {isEdit ? 'Update' : 'Create'}
                </Button>
            </Box>
        </Paper>
    );
}
