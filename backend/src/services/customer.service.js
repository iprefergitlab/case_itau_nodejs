const CustomerModel = require('../models/customer.model');

class CustomerService {
    static async getAll() {
        return await CustomerModel.findAll();
    }

    static async getById(id) {
        return await CustomerModel.findById(id);
    }

    static async create(data) {
        return await CustomerModel.create(data);
    }

    static async update(id, data) {
        return await CustomerModel.update(id, data);
    }

    static async remove(id) {
        return await CustomerModel.remove(id);
    }

    static async deposit(id, value) {
        if (value <= 0) {
            throw new Error('Deposit value must be positive.');
        }
        return await CustomerModel.deposit(id, value);
    }

    static async withdraw(id, value) {
        if (value <= 0) {
            throw new Error('Withdraw value must be positive.');
        }
        return await CustomerModel.withdraw(id, value);
    }
}

module.exports = CustomerService;
