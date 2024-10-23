const errorHandler = (err, req, res, next) =>{
    console.log(err, "<<<<<<<<<<< err dari handler");
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
            message: err.errors.map((el) => {
                return el.message
            })
        })
    } else if(err.name ==="InvalidToken" || err.name === "JsonWebTokenError"){
        res.status(401).json({message: 'Invalid Token'})
    } else if(err.name === "NotFound"){
        res.status(404).json({message: "Data not found"})
    } else if(err.name === "Forbidden"){
        res.status(403).json({message: "Forbidden authorization"})
    } else if(err.name === "EmailNull"){
        res.status(400).json({message : "Email is required"})
    } else if(err.name === "PassNull"){
        res.status(400).json({message: "Password is required"})
    } else if(err.name === "LoginFailed"){
        res.status(401).json({message: "Email or Password is wrong"})
    }
    else {
        res.status(500).json({message: "internal error server"})
    }
}

module.exports = errorHandler