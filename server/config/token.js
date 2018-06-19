const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{
        if(req.headers.autharization){
        const token = req.headers.autharization.split(" ")[1];
        console.log(token);
        const decode = jwt.verify(token,'citicollege');
        if(decode){
            next();
        }else{
            return res.status(404).json({msg:'Auth Failed'});
        }
    }else{
        return res.status(404).json({msg:'Auth Failed'});
    }
    }catch(error){
        console.log(error);
        return res.status(404).json({msg:'Auth Failed'});
    }
}