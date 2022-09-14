var crypto = require('crypto'); 
     

const encryptedPass = (password) => {
    const salt = crypto.randomBytes(16).toString('hex'); 
    const hashingPass =   crypto.pbkdf2Sync(password, salt,  
    1000, 64, `sha512`).toString(`hex`); 
    return {salt,hashingPass};
}
     
const checkPassword = (password, salt,hashingPass) => {
        var hash = crypto.pbkdf2Sync(password,  
        salt, 1000, 64, `sha512`).toString(`hex`); 
        return hashingPass === hash; 
}

module.exports={checkPassword, encryptedPass}
