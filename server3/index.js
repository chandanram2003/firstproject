
const { v4: uuidv4 } = require("uuid");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Ram123@#",
    database: "userdata"
})
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    const sqlGet = "select * from data";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    })
})

app.post("/api/post", (req, res) => {
    const { name, email, password, phone, address } = req.body;
    // const id = uuidv4();
    const sqlInsert = "insert into data (name,email,password,phone,address) values (?,?,?,?,?)";
    db.query(sqlInsert, [name, email, password, phone, address], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send("user added successfully!");
    })
})

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "delete from data where id=?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send("deleted user successfully!");
    })
})

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "select * from data where id=?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})


app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, password, phone, address } = req.body;
    const sqlUpdate = "update data set name=?,email=?,password=?,phone=?,address=? where id=?";
    db.query(sqlUpdate, [name, email, password, phone, address, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send("updated user successfully!");
    })
})
app.listen(5000, () => {
    console.log("server is running on port 5000");
})