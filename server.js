const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const path = require('path');



dotenv.config({path:'config.env'});

const PORT = process.env.PORT || 8080


//for logging the request from the client to the server
app.use(morgan('tiny'));

app.use(bodyparser.urlencoded({extended:true}));

// set view engine

app.set("view engine","ejs");

app.set('/views',express.static(path.resolve(__dirname,"views/index.ejs")))
//for loading assets from the local project

app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))


// app.get('/' , (req , res)=>{

//    res.send('hello from simple server :)')

// })

app.get('/' ,(req , res)=>{

    res.render(`index`)
 
 })
app.get('/testroute' , (req , res)=>{

    res.send('hello from simple server - another route which was i created :)')
 
 })
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
