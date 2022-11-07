const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cruddb',
    port: '3306',
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//READ INFORMATION 
app.get('/api/get', (req, res)=> {
    const sqlSelect = 
    "SELECT * FROM user"
    db.query(sqlSelect, (err, result)=> {
        res.send(result)
    })
})

// CREATE INFORMATION
app.post("/api/insert", (req, res) => {
    const username = req.body.username
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    
    const sqlInsert = "INSERT INTO user (username, firstname, lastname) VALUES (?, ?, ?)"
    db.query(sqlInsert, [username, firstname, lastname], (err, result)=> {
        console.log(result)
    })
});

//DELETE INFORMATION
app.delete("/api/delete/:username", (req, res) => {
    const name = req.params.username;
    const sqlDelete = "DELETE FROM user WHERE username = ?"

    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err)
    })
})

//UPDATE INFORMATION
app.put("/api/update", (req, res) => {
    const name = req.body.firstname;
    const username = req.body.username;
    const sqlUpdate = "UPDATE user SET username = ? WHERE firstname = ?"

    db.query(sqlUpdate, [username, name], (err, result) => {
        if (err) console.log(err)
    })
})


app.listen(3001,() => {
    console.log("running on port 3001");
})