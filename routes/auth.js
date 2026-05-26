const express = require('express')
const router = express.Router()
const db = require('../db/connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/auth/register', async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error:"missing field"})
    }
    const hashed = await bcrypt.hash(password, 10)

    db.query('insert into users (email, password) values (?, ?)', [email, hashed], (err, result)=>{
        if(err){
            if(err.code === "ER_DUP_ENTRY"){
                return res.status(400).json({messagem:"email already in use"})
            }
        return res.status(500).json({error:"database error"})
        }
        res.status(200).json({message:"user created"})
    })
})


router.post("/auth/login",(req,res)=>{
    const {email, password} =  req.body;
    if(!email || !password){
        return res.status(400).json({error:"Missing field"})
    }
    
    db.query("select * from users where email = ? ", [email], async (err,result)=>{
        if(err){
            return res.status(500).json({error:"database error"})
        }
        if(result.length === 0){
            return res.status(400).json({error:"Invalid credentials"})
        };


        const user = result[0]
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(400).json({error:"Invalid credential"})
        }
        const token  = jwt.sign({id: user.id}, process.env.JWT_SECRET,{expiresIn:"7d"})

        res.json({ token }) 
    })
})


module.exports = router;