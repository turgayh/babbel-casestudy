/* eslint-disable no-redeclare */
/* eslint-disable no-undef */

const { checkPassword } = require("../helper/pass-hashing");
const {  getUserAuthInfo } = require("../service/user.service");

async function auth (req, res, next){
    var authHeader = req.headers.authorization;
    if(!authHeader){
        var err = new Error('You are not authenticated')

        res.setHeader('WWW-Authenticate','Basic');
        err.status = 401
        next(err)
    }
    var encoded = req.headers.authorization.split(' ')[1];
    var decoded = new Buffer.from(encoded,'base64').toString();
    var username = decoded.split(':')[0];
    var password = decoded.split(':')[1];
    const userInfo = await getUserAuthInfo(username)
    if(!userInfo){
        var err = new Error('User not found')

        res.setHeader('WWW-Authenticate','Basic');
        err.status = 401
        next(err)
    }
    
    if(checkPassword(password,userInfo['salt'], userInfo['password'])){
        next();
    }else{
        var err = new Error('You are not authenticated')

        res.setHeader('WWW-Authenticate','Basic');
        err.status = 401
        next(err)
    }
}

module.exports = { auth };
