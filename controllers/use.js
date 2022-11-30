const fs = require('fs');
const registration = ((req, res) => {
    let { name, email, password, age, city } = req.body;
    var name1 = /^[a-z A-Z]+$/;
    var email1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var pass1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,24}$/;
    var age1 = /^[0-9]{2}$/;
    var city1 = /^[a-z A-Z]+$/;
    let nameErr;
    let emailErr;
    let passErr;    
    let ageErr;
    let cityErr;
    if(name1.test(name) && email1.test(email) && pass1.test(password) && age1.test(age) && city1.test(city)) {
        if (fs.existsSync(`./public/users/${email}.txt`)) {
            res.render('register', { errMsg: 'Email already registered' })
        }
        else {
            fs.writeFile(`./public/users/${email}.txt`, `${name}\n${email}\n${password}\n${age}\n${city}`, (err) => {
                if (err) {
                    res.render('register', { errMsg: 'something went wrong' })
                }
                else {
                    // res.redirect('/welcome/'+email)
                    res.render('register', { successMsg: 'Registered Successfully' })
                }

            })
        } 
    }
    else {
        if(!name1.test(name)) {
            nameErr = 'Only latter and white spaces allow ';
        }
        if(!email1.test(email)) {
            emailErr = 'Email address is not valid';
        }
        if(!pass1.test(password)) {
            passErr = 'password between 8 to 24 characters which contain at least one  uppercase,lowercase'
        }
        if(!age1.test(age)) {
            ageErr = 'Only two digit number is allowed'
        }
        if(!city1.test(city)) {
            cityErr = 'Only latter and white spaces allow';
        }
        res.render('register', { nameErr: nameErr, passErr: passErr, emailErr: emailErr, cityErr: cityErr, ageErr: ageErr })
    }
})

const login = ((req, res) => {
    let { email, password } = req.body;
    if (fs.existsSync(`./public/users/${email}.txt`)) {
        const data = fs.readFileSync(`./public/users/${email}.txt`, 'UTF-8')
        const lines = data.split(/\r?\n/);
        if (lines[2] == password) {
            res.render('index', { email: email, successMsg: 'Login successfull' })
        }
        else {
            res.render('login', { errMsg: 'Enter Valid Password' })
        }
    }
    else {
        res.render('login', { errMsg: 'User is Not found' })
    }

})

module.exports = { registration, login }