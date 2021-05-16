const express = require('express'); // Cp
const router = express.Router(); // Cp

const auth = require('../controllers/authController')

router.get('/', auth, (req,res) =>{
    if(req.user.admin){
        res.send("Esse dado so deve ser visto pelo admin")
    }else{
        res.status(401).send('Acesso não permitido parceiro');
    }
})

module.exports = router; // Cp

