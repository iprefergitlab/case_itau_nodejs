import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import CustomerDetails from './components/CustomerDetails';
import { Container, CssBaseline, Typography, Box, AppBar, Toolbar } from '@mui/material';

function App() {
    return (
        <Router>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Itaú Customer Management</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Box>
                    <Routes>
                        <Route path="/" element={<Navigate to="/customers" />} />
                        <Route path="/customers" element={<CustomerList />} />
                        <Route path="/customers/new" element={<CustomerForm />} />
                        <Route path="/customers/:id" element={<CustomerDetails />} />
                        <Route path="/customers/:id/edit" element={<CustomerForm />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
}

export default App;
