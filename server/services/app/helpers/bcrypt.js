const bcrypt = require("bcryptjs")

const hashPassword = (password) => {
    return bcrypt.hashSync(password)
}

const compare = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports= {
    hashPassword,
    compare
}