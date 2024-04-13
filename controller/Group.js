
const { group } = require('console');
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
      }
  
    } catch (error) {
      console.error('Error:', error);
    }

  }

  async function GroupMembers(req, res) {
    try {
        let groupName = req.body.groupName;

        let group = await Group.findOne({ name: groupName });

        if (group) {
            let groupMembersId = group.members;

            // Fetch the details of group members
            let groupMembersDetails = [];
            for (let memberId of groupMembersId) {
                let memberDetails = await User.findById(memberId);
                groupMembersDetails.push(memberDetails);
            }

            let usersOfTheGroup = groupMembersDetails.map((user)=>{return user.username})
            console.log(usersOfTheGroup)

            res.json({ groupMembers: usersOfTheGroup });
        } else {
            res.json({ error: "Group does not exist" });
        }
    } catch (error) {
        console.error("Error fetching group members:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

  

  async function joinGroup(req, res) {
    try {
        let groupName = req.body.groupName;
        let username = req.body.username;

        let group = await Group.findOne({ name: groupName });
        let currentUser = await User.findOne({ username: username });

        if(!currentUser){
            return res.json({msg:"user doesnot exist"})
        }

        if (group) {
            // Check if the user is already a member of the group
            if (group.members.includes(currentUser._id)) {
                return res.json({ error: "You are already a member of this group" });
            }

            // Check if the group has reached its maximum member limit
            if (group.members.length >= group.maxMembers) {
                return res.json({ error: "Group has reached its maximum member limit" });
            }

            // Update the group member list and decrease maxMembers by 1
            let updatedGroup = await Group.findOneAndUpdate(
                { name: groupName },
                { 
                    $push: { members: currentUser._id },
                    // $inc: { maxMembers: -1 } // Decrease maxMembers by 1
                },
                { new: true }
            );

            res.json({ message: "Successfully joined the group", group: updatedGroup });
        } else {
            res.json({ error: "Group does not exist" });
        }
    } catch (error) {
        console.error("Error joining group:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

  
  module.exports = {createGroupIfNotExist , GroupMembers ,joinGroup};