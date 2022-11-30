const express = require('express');
const app = express();
const PORT = 2000;
const exphbs=require('express-handlebars')
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));

// route
const userRoute=require('./routes/userRoutes')
app.use("/",userRoute);

// page not found 
app.use("*",(req,res)=>{
    res.render("not found");
});


app.listen(PORT, (err) => {
    if (err) throw err;
    else console.log(`the server run on the ${PORT}`)
})
