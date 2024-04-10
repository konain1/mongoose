

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

  
  // Example usage:
//   createUser('john_doe', 'john@example.com', 'password123')
//     .then(newUser => {
//       console.log('New user:', newUser);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });


module.exports = {createUser}