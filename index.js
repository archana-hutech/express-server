const express = require('express');
const app = express();
let db = require("./model/db");
require("dotenv").config();
const port = process?.env?.port || 3001;

db.sequelize
    .authenticate()
    .then(() => {
        console.error(
            `express server connected to "${process?.env?.SERVERHOST || "NA"
            }" database "${process?.env?.DBNAME || "NA"}"`
        );

        db.sequelize.sync();

    })
    .catch((err) => {
        console.error(
            `ERROR - Unable to connect to the database: "${process.env.DB_NAME}"`,
            err
        );
    });


app.get("/", (req, res) => {
    res.send("Welcome to localhost express server");
});

app.listen(port, (err) => {
    if (!err) {
        console.log("server running at port 3001");
    }
});
