const jwt = require('jsonwebtoken');

//Protect Route
exports.protect = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        res.status(401).json({
            success:false,
            message:'You are not authorized!'
        });
        return;
    }

    try{
        //Verify token
        console.log(process.env.JWT_SECRET,'TOKEN');
        jwt.verify(token,process.env.JWT_SECRET);
        next();
    }catch(e){
        res.status(401).json({
            success:false,
            message:'You are not authorized!'
        });
        return;
    }

}