const express = require('express');
const router = express.Router(); 
const { registration,login }=require('../controllers/use')

router.get('/', (req, res) => {
    res.render('login');
})
router.get('/welcome/:id', (req, res) => {
    let email=req.params.id;
    res.render('index',{email:email});
})
router.get('/about', (req, res) => {
    res.render('about');
})
router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})
router.post('/login_process', login)
router.post('/save_registration', registration)
module.exports=router;