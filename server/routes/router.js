const express = require('express');
const route = express.Router()
const jwt = require('jsonwebtoken');
const services = require('../services/render');
const controller = require('../controller/controller');
const dotenv = require('dotenv');
const { json } = require('body-parser');

// get config vars
dotenv.config( { path : 'config.env'} )

// access config var
process.env.TOKEN_SECRET;
/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)


// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

route.post('/api/authuser', controller.authUserCreate);
route.get('/me',authenticateToken,controller.getIn);
function authenticateToken(req, res, next) {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
  const token = req.headers['token']
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        
        res.status(200).send(decoded);
        // res.status(200).send(json({"token":decoded}));
      });
  }
module.exports = route