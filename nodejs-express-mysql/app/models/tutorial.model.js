const sql = require("./db.js");

// constructor
const Tutorial = function (tutorial) {
    this.name = tutorial.name;
    this.price = tutorial.price;
    this.extended_description = tutorial.extended_description;
    this.category = tutorial.category;
    this.sale = tutorial.sale;
    this.image = tutorial.image;
};

Tutorial.create = (newTutorial, result) => {
    sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
        result(null, { id: res.insertId, ...newTutorial });
    });
};

Tutorial.findById = (id, result) => {
    sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Tutorial.getAll = (name, result) => {
    let query = "SELECT * FROM tutorials";

    if (name) {
        query += ` WHERE name LIKE '%${name}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tutorials: ", res);
        result(null, res);
    });
};

Tutorial.getAllPublished = result => {
    sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tutorials: ", res);
        result(null, res);
    });
};

Tutorial.updateById = (id, tutorial, result) => {
    sql.query(
        "UPDATE tutorials SET name = ?, price = ?, extended_description = ?, category = ?, sale = ?, image = ? WHERE id = ?",
        [tutorial.name, tutorial.price, tutorial.price, tutorial.extended_description, tutorial.category, tutorial.sale, tutorial.image, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated tutorial: ", { id: id, ...tutorial });
            result(null, { id: id, ...tutorial });
        }
    );
};

Tutorial.remove = (id, result) => {
    sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted tutorial with id: ", id);
        result(null, res);
    });
};

Tutorial.removeAll = result => {
    sql.query("DELETE FROM tutorials", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} tutorials`);
        result(null, res);
    });
};

module.exports = Tutorial;