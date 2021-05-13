const jwt = require('jsonwebtoken')


const validateJWT = (req, resp, next) => {
    // Leer el token 
    const token = req.header('x-token');
    
    if(! token){
        return resp.status(401).json({
            ok: false,
            msg: 'There is not Token'
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return resp.status(401).json({
            ok: false,
            msg: 'Token is not valid'
        })
    }
}

module.exports = {
    validateJWT
}

