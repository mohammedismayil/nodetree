const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
var Userdb = require('../model/model');
var authUserdb = require('../model/authUser');
const { json } = require('body-parser');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}


exports.authUserCreate =  (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

console.log(req.body.name)
console.log(req.body.password)

authUserdb.findOne({name: req.body.name}).then(user=>{
    if (user){

        bcrypt.compare(req.body.password, user.password, function(err, responseFrom) {
            if (responseFrom){
                // responseFrom.redirect('/');
                res.json(user);
            }else{
                // res.send({ message: "The username and password combination is correct!" });
                res.json({ message :  "your password is wrong mate"});
                // res.json(user);
                // return res.json({success: false, message: 'passwords do not match'});
            }
        });
    
    }else {
        
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            // Store hash in your password DB.
    
            console.log(hash)
    
             // new user
        const user = new authUserdb({
            name : req.body.name,
            password : hash
        })
    
        // save user in the database
     user
     .save(user)
     .then(data => {
         //res.send(data)
        //  res.redirect('/add-user');


  const token = generateAccessToken({ username: req.body.name });
  res.json(token);
        // res.json({"status":"user created successfully"})
     })
     .catch(err =>{
         res.status(500).send({
             message : err.message || "Some error occurred while creating a create operation"
         });
     });
    
        });
    
     
    
    });
    }
})

}


exports.getIn =  (req,res) => {
console.log(res)

}


function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
  }
  