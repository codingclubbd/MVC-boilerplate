// dependencies 
const { hash } = require('bcrypt')

//password hash function
const hashStr = async (str) => {
    return hashedStr = await hash(str, Number(process.env.BCRYPT_SALT_ROUND));
}

//exports
module.exports = hashStr;