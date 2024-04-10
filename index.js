
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// import {createUser} from './controller/user'
const {createUser} = require('./controller/user');

const bodyParser = require('body-parser');



mongoose.connect('mongodb+srv://konain7:Kaunain%4099@cluster0.rmyvhx6.mongodb.net/userandgroup')
  .then(() => console.log('Connected to MongoDB'))

  .catch(err => console.error('Error connecting to MongoDB:', err));

  const express = require('express')

  const app = express();

  app.use(bodyParser.json());

  app.post('/',createUser)  




  app.listen(3090 , ()=>console.log('server o 3090'))