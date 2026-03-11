const express = require("express");
const cors = require("cors")
const db = require("../db/connection.js")
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("testeteste");
});

app.listen(3000, () => {
  console.log(`SERVER RUNNING ON: http://localhost:${port}`);
});

db.query('SELECT 1',(err, result)=>{
  if(err){
    return console.log("ERROR RUNNING DATABASE")
  }console.log("RUNNING DATABASE")
})