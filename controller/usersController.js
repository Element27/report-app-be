// @description: handles all user related requests
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../model/userModel');


// @description: gets all users
// @route GET /api/users
// @access public

const getAllUsers = asyncHandler(async (req, res) => {

  const data = await User.find({});

  // remove password from the data returned using map
  const refinedData = data.map((user) => {
    return trimUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v
    }
  })


  res.json({ message: "successful", data: refinedData, meta_data: { count: data.length } });
})


// @description: add new users
// @route POST /api/users
// @access public

const addUser = asyncHandler(async (req, res) => {

  console.log(req.user)
  console.log(req.user.role)
  // only super-admin and admin can add new users
  if (req.user.role !== "super-admin") {
    if (req.user.role !== "admin") {
      res.status(400);
      throw new Error('you dont have permission to perform this action.');
    }
  }

  if (!req.body || req.body === undefined) {
    res.status(400)
    throw new Error('Invalid request')
  }

  const { name, email, role, } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('name is required');
  }

  if (!email) {
    res.status(400);
    throw new Error('email is required');
  }

  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error("email already exist");
  }

  if (!role) {
    res.status(400);
    throw new Error('role is required');
  }

  const hashedPassword = await bcrypt.hash("Password", 10);

  const newUser = await User.create({
    name,
    email,
    role,
    password: hashedPassword,
    isActive: true,
  })

  // TODO send the registration details to the newly added user.

  res.json({ message: "created successfully", data: newUser });
})




// @description: gets single
// @route GET /api/users/id
// @access public

const getUser = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const data = await User.findOne({ _id: id });

  if (!data) {
    res.status(400);
    throw new Error("user not found");
  }

  // remove password from the data being sent to the client
  const userData = {
    _id: data._id,
    name: data.name,
    email: data.email,
    role: data.role,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    isActive: data.isActive
  }

  res.json({ message: "successful", data: userData });
})

// @description: update user
// @route PUT /api/users/id
// @access public

const updateUser = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const data = await User.findOne({ _id: id });

  if (!data) {
    res.status(400);
    throw new Error("user not found");
  }

  const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });

  // if (!updatedData) {
  //   res.status(400);
  //   throw new Error("failed to update");
  // }

  res.json({ message: "update successful", data: updatedData });
})

// @description: delete user
// @route DELETE /api/users/id
// @access public

const deleteUser = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const data = await User.findOne({ _id: id });

  if (!data) {
    res.status(400);
    throw new Error("user not found");
  }

  await User.findByIdAndDelete({ _id: id });
  res.json({ message: "delete successful" })
})


module.exports = {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser
}