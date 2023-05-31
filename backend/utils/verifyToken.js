import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({success: false, message:"We are not authorize"})
    }

    // if token is exist then verify the token 
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return res.status(401).json({success: false, message: "Token is invalid"})
        }
        req.user = user;
        next()
    })
}

export const verifyUser = (req, res, next)=>{
    verifyToken(req, res, next, ()=>{
        if(req.user.id === req.params.id || req.user.role === 'user'){
            next()
        } else {
           return  res.status(401).json({success: false, message: "You're not authenticated"})
        }
    })
}

export const verifyAdmin = (req, res, next)=>{
    verifyUser(req, res, next, ()=> {
        if(req.user.role === 'admin'){
            next()
        } else {
            return res.status(401).json({success: false, message: "You're not authorize"})
        }
    })
}