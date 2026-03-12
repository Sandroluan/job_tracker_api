const express = require("express")
const router = express.Router()
const db = require('../db/connection')


router.get('/applications', (req,res)=>{
  db.query("select * from applications", (err, result)=>{
    if(err){
      return res.status(500).json({error:"Database error"})
    }res.json(result)
  })
})


module.exports = router