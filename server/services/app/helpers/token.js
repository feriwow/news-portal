const jwt = require("jsonwebtoken")

const SECRET_KEY = "ini_rahasia"

const token = (data) => {
    return jwt.sign(data, SECRET_KEY)
}

const verivyToken = token =>{
    return jwt.verify(token, SECRET_KEY)
}

// const access_token = token({id:"1", name: "sembarang"})
// var decoded = verivyToken(access_token)

module.exports = {
    token,
    verivyToken
}