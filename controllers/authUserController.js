const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.header('authorization-token');
    if(!token) return res.status(401).send('Você não está logado');
    try{
        const userVerified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = userVerified;
        console.log("O usuário está logado");
        console.log(req.user);
        next();
    }catch{
        res.status(401).send('Seu token é inválido');
    }
}   