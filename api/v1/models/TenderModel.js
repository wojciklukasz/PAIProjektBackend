const mysql = require('mysql2/promise');
const ct = require('../functions/GetCurrentTimeFunction');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Przetargi"
});

const getAllActiveTenders = async () => {
    const sql = 'SELECT * FROM Tender WHERE EndDate > "' + ct.getCurrentTime() + '";';
    let r;
    try {
        const [rows] = await pool.query(sql);
        r = rows;
    } catch (err) {
        console.error(err);
        r = err;
    }
    return r;
};

const getAllPastTenders = async () => {
    const sql = 'SELECT * FROM Tender WHERE EndDate < "' + ct.getCurrentTime() + '";';
    let r;
    try {
        const [rows] = await pool.query(sql);
        r = rows;
    } catch (err) {
        console.error(err);
        r = err;
    }
    return r;
};

const getOneTender = async (id) => {
    const sql = 'SELECT * FROM Tender WHERE Id = "' + id + '";';
    let r;
    try {
        const [rows] = await pool.query(sql);
        r = rows;
    } catch (err) {
        console.error(err);
        r = err;
    }
    return r;
};

const getBudgetForTender = async (id) => {
    const sql = 'SELECT * FROM Tender WHERE Id = "' + id + '";';
    let r;
    try {
        const [rows] = await pool.query(sql);
        r = rows;
    } catch (err) {
        console.log(err);
        return -1;
    }
    return r[0].Budget;
}

const createTender = async (tenderToInsert) => {
    const sql = 'INSERT INTO Tender (Name, Owner, Description, Budget, StartDate, EndDate) VALUES (?)';
    let r;
    try {
        const [rows] = await pool.query(sql, [tenderToInsert]);
        r = rows;
    } catch (err) {
        console.error(err);
        r = err;
    }
    return r;
};

module.exports = {
    getAllActiveTenders,
    getAllPastTenders,
    getOneTender,
    getBudgetForTender,
    createTender
};