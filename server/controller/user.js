const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../model/user');
const auth = require('../config/token');

//get all users
router.get('/',auth,(req,res,next)=>{
    User.find()
    .exec()
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(next);
});

//add a new user
router.post('/',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then((data)=>{
        if(data.length >= 1){
            res.status(409).json({msg:"email already in use"});
        }else{
            bcrypt.hash(req.body.password,10,(err,hashPassword)=>{
                if(err){
                    return res.status(500).json({error:err});
                }else{
                    console.log(hashPassword);
                    const user = new User({
                        email:req.body.email,
                        password:hashPassword
                    });
                    user.save()
                    .then((data)=>{
                        res.status(200).json(data);
                    })
                    .catch(next);
                }
            });
        }
    });
});

router.post("/login",(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then((user)=>{
        if(user.length < 1){
            return res.status(404).json({msg:"Auth failed"});
        }
        bcrypt.compare(req.body.password,user[0].password,(err,data)=>{
            if(err){
                return res.status(500).json({error:err});
            }else{
                if(data){//the token secrect key is created and set expire timeing encrypted by citicollege
                    const token = jwt.sign({id:user[0]._id},'citicollege',{expiresIn:'1hr'});
                    return res.status(200).json({msg:'Auth successfully',token:token});
                }else{
                    return res.status(404).json({msg:"Auth failed"});
                }
            }
        });
    })
    .catch(next)
});


module.exports = router;