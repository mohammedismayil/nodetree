const express = require('express');
const app = express();
app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')

})
// app.get('/testroute' , (req , res)=>{

//     res.send('hello from simple server - another route which was i created :)')
 
//  })
app.listen(3000,()=>{
    console.log("Server is running on http://localhost:{30000}")
})
