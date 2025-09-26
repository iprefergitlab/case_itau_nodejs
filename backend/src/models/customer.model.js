const db = require('../database/db');

class CustomerModel {
    static findAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM customers', [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM customers WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    static create({ name, email }) {
        return new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO customers(name, email, balance) VALUES (?, ?, 0)',
                [name, email],
                function (err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, name, email, balance: 0 });
                }
            );
        });
    }

    static update(id, { name, email }) {
        return new Promise((resolve, reject) => {
            db.run(
                'UPDATE customers SET name = ?, email = ? WHERE id = ?',
                [name, email, id],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.changes);
                }
            );
        });
    }

    static remove(id) {
        return new Promise((resolve, reject) => {
            db.run(
                'DELETE FROM customers WHERE id = ?',
                [id],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.changes);
                }
            );
        });
    }

    static async deposit(id, value) {
        return new Promise((resolve, reject) => {
            if (value <= 0) {
                return reject(new Error('Please enter a valid positive amount.'));
            }
            db.run(
                'UPDATE customers SET balance = balance + ? WHERE id = ?',
                [value, id],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.changes);
                }
            );
        });
    }

    static async withdraw(id, value) {
        return new Promise((resolve, reject) => {
            db.get('SELECT balance FROM customers WHERE id = ?', [id], (err, row) => {
                if (err) return reject(err);
                if (!row || row.balance < value) {
                    return reject(new Error('Insufficient funds.'));
                }
                db.run(
                    'UPDATE customers SET balance = balance - ? WHERE id = ?',
                    [value, id],
                    function (err) {
                        if (err) return reject(err);
                        resolve(this.changes);
                    }
                );
            });
        });
    }
}

module.exports = CustomerModel;
