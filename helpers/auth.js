const jwt = require('jsonwebtoken');

exports.getSignedJwtToken = function(data){
    return jwt.sign({data:data},process.env.JWT_SECRET);
}