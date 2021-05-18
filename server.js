const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080
app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})
// app.get('/testroute' , (req , res)=>{

//     res.send('hello from simple server - another route which was i created :)')
 
//  })
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
