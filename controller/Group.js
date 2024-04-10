
const {User,Group} = require('../db/user')


async function createGroupIfNotExist(req,res) {
    
    let {groupName,maxMembers,email,username} = req.body

    try {
      // Find the user by username and email
      let user = await User.findOne({ username, email });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      // Find the group by name
      let group = await Group.findOne({ name: groupName });
  
      if (!group) {
        // Create a new group if it doesn't exist
      group = await Group.create({
          name: groupName,
          creator: user._id,
          members: [user._id],
          maxMembers: maxMembers
        });
        res.json({msg:group})
      } else {
        res.json({msg:'Group already exists:'})
        console.log('Group already exists:', group);
      }
  
    } catch (error) {
      console.error('Error:', error);
    }

  }
  
  
  module.exports = {createGroupIfNotExist};