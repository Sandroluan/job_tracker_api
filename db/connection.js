const mysql = require('mysql2')
const connection = mysql.createPool({
  host:'localhost',
  user:"root",
  password:'Maisquecaralho1@',
  database:"job_tracker"
})

module.exports = connection