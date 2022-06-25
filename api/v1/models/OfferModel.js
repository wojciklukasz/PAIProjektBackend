const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Przetargi"
});

const getOffersForTender = async (id, budget) => {
    const sql = 'SELECT * FROM Offer WHERE TenderId = ' + id + ' AND Price <= ' + budget + ' ORDER BY Price;';
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

const createOffer = async (offerToInsert) => {
    const sql = 'INSERT INTO Offer (Owner, Price, TenderId) VALUES (?)';
    let r;
    try {
        const [rows] = await pool.query(sql, [offerToInsert]);
        r = rows;
    } catch (err) {
        console.error(err);
        r = err;
    }
    return r;
};

module.exports = {
    getOffersForTender,
    createOffer
};