
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {createUser} = require('./controller/user');
const {createGroupIfNotExist,GroupMembers, joinGroup} = require('./controller/Group')

const bodyParser = require('body-parser');



mongoose.connect('mongodb+srv://konain7:Kaunain%4099@cluster0.rmyvhx6.mongodb.net/userandgroup')
  .then(() => console.log('Connected to MongoDB'))

  .catch(err => console.error('Error connecting to MongoDB:', err));

  const express = require('express');

  const app = express();

  app.use(bodyParser.json());

  app.post('/',createUser)  
  app.post('/group',createGroupIfNotExist)
  app.get('/members',GroupMembers)
  app.get('/joingroup',joinGroup)




  app.listen(3090 , ()=>console.log('server o 3090'))