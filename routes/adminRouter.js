const express = require('express'); // Cp
const router = express.Router(); // Cp

const authUser = require('../controllers/authUserController');
const adminController = require('../controllers/adminController');

router.get('/', authUser, (req,res) =>{
    if(req.user.admin){
        res.send("Esse dado so deve ser visto pelo admin");
    }else{
        res.status(401).send('Acesso não permitido parceiro');
    }
})

router.get('/viewSchedule', authUser, adminController.viewSchedule)

router.post('/login', adminController.login);

router.delete('/complete/schedule/:id', authUser, adminController.completeSchedule);

router.delete('/complete/schedule', authUser, adminController.completeSchedule);

router.delete('/cancel/schedule/:id', authUser, adminController.cancelSchedule);

router.delete('/cancel/schedule', authUser, adminController.cancelSchedule);

module.exports = router; // Cp

//lucas.dechenieroliveira@hotmailll.com1234 3809299lucas admin
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGExNGUxYmMyNjM3MDJjMjg3ODliMjQiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjIxMTg0Mjc1fQ.vTrEi8qddyOh4c2yXVqXibwggxEbeOEHQOOflTZgkmI"

//lucas.dechenieroliveira@hotmailll.com123 3809299lucas
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGExNGUwZWMyNjM3MDJjMjg3ODliMjMiLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTYyMTE4NDMwNn0.vb-RSqHEs-C1ZQB1-dh3d8yYFWjf-T-o9IeenNvCXqU"

