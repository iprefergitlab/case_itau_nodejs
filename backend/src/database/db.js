const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run(`CREATE TABLE customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        balance FLOAT DEFAULT 0
    )`);
    db.run(`INSERT INTO customers(name, email, balance) VALUES (?, ?, 0)`, ['TEST', 'TEST@TEST.com']);
});
module.exports = db;
