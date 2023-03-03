const { ObjectId } = require('mongoose').Types;
const {  User,Thought } = require('../models');

// Aggregate function to get the number of students overall
const friendCount = async () =>
  User.aggregate()
    .count('friendCount')
    .then((numberOfStudents) => numberOfStudents);

// Aggregate function for getting the overall grade using $avg
const grade = async (studentId) =>
  Student.aggregate([
    // only include the given student by using $match
    { $match: { _id: ObjectId(studentId) } },
    {
      $unwind: '$assignments',
    },
    {
      $group: {
        _id: ObjectId(studentId),
        overallGrade: { $avg: '$assignments.score' },
      },
    },
  ]);

const userController = {
  getUsers(req, res) {
    User.find()
      .sort({createdAt: -1})
      .then((userData)=>{
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  
  // Get a single student
    getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then( (userData) =>
        !userData
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
            userData,
             // thought: thought(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user
   deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) =>{
        if(!userData){
         res.status(404).json({ message: 'No such user exists' });
        }
          return Thought.deleteMany({_id: {$in: userData.thoughts}});
      })
        .then(()=> {
          res.json({ message: 'user and thoughts successfully deleted' });
        })
          /*: User.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { user: req.params.userId } },
              { new: true }
            )*/
      
     /* .then((userData) =>
        !userData
          ? res.status(404).json({
              message: 'User deleted, but no friends found',
            })
          : res.json({ message: 'Student successfully deleted' })
      )*/
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add friends to user
  addfriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friends from user
  removefriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.studentId },
      { $pull:{ friends: req.params.friendId }  },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports= userController;