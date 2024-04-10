

const mongoose = require('mongoose');
const {User} = require('../db/user')





async function createUser(req, res) {
    let {username, password, email} = req.body;
    try {
        const newUser = await User.create({ username, email, password })
        console.log('User created:', newUser);
        res.status(201).send(newUser); // Respond with the created user
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
}

module.exports = {createUser};

  



