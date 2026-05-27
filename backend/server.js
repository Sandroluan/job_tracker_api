const express = require("express");
const cors = require("cors")
const db = require("../db/connection.js")
const applicationRoutes = require("../routes/applications.js")
const authRoutes = require('../routes/auth.js')
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }))
app.use('/', authRoutes)
app.use('/', applicationRoutes)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log(`SERVER RUNNING ON: http://localhost:${port}`);
});

db.query('SELECT 1',(err, result)=>{
  if(err){
    return console.log("ERROR RUNNING DATABASE")
  }console.log("RUNNING DATABASE")
})