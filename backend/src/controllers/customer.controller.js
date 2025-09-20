const CustomerService = require('../services/customer.service');

exports.getAll = async (req, res, next) => {
    try {
        const customers = await CustomerService.getAll();
        res.json(customers);
    } catch (err) {
        next(err);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const customer = await CustomerService.getById(req.params.id);
        if (!customer) return res.status(404).json({ error: 'Customer not found.' });
        res.json(customer);
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        const customer = await CustomerService.create(req.body);
        res.status(201).json(customer);
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const changes = await CustomerService.update(req.params.id, req.body);
        if (!changes) return res.status(404).json({ error: 'Customer not found.' });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const changes = await CustomerService.remove(req.params.id);
        if (!changes) return res.status(404).json({ error: 'Customer not found.' });
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};

exports.deposit = async (req, res, next) => {
    try {
        await CustomerService.deposit(req.params.id, req.body.value);
        res.status(200).end();
    } catch (err) {
        next(err);
    }
};

exports.withdraw = async (req, res, next) => {
    try {
        await CustomerService.withdraw(req.params.id, req.body.value);
        res.status(200).end();
    } catch (err) {
        next(err);
    }
};
