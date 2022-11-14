const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
let db = require("./model/db");
const userroutes = require("./controller/users");
require("dotenv").config();
const port = process?.env?.port || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));


db.sequelize
    .authenticate()
    .then((error) => {
        if (!error) {
            console.error(
                `express server connected to "${process?.env?.SERVERHOST || "NA"
                }" database "${process?.env?.DBNAME || "NA"}"`
            );
        } else {
            console.error(
                `express server connected to "${env?.SERVERHOST || "NA"}" database ${env?.DBNAME || "NA"
                }`
            );
        }

        db.sequelize.sync();
        //{force: true}
        //{alter: true}
    })
    .catch((err) => {
        console.error(
            `ERROR - Unable to connect to the database: "${process.env.DB_NAME}"`,
            err
        );
    });


app.get("/", (req, res) => {
    res.send("Welcome to express server");
});

app.use("/user", userroutes);

app.listen(port, (err) => {
    if (!err) {
        console.log("server running at port 3001");
    }
});
