const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');


const User = require('../model/userModel');
const Company = require('../model/companyModel');
const generateToken = require('../utils/generateToken');



// @description: register a new user
// @route POST /api/auth/register
// @access public

const register = asyncHandler(async (req, res) => {

  if (!req.body || req.body === undefined) {
    res.status(400)
    throw new Error('Invalid request')
  }

  const { name, email, password, company_name, company_email, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('name is required');
  }
  if (!company_name) {
    res.status(400);
    throw new Error('company name is required');
  }

  if (!email) {
    res.status(400);
    throw new Error('email is required');
  }

  if (await User.findOne({ email })) {
    res.status(400);
    throw new Error("email already exist");
  }

  if (!password) {
    res.status(400);
    throw new Error('role is required');
  }


  //  password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "super-admin",
    isActive: true
  })

  const newCompany = await Company.create({
    name: company_name,
    email: company_email,
    description: description,
    user_id: newUser._id
  })

  if (!newUser || !newCompany) {

    if (newUser) {
      await User.deleteOne({ _id: newUser._id });
    }

    if (newCompany) {
      await Company.deleteOne({ _id: newCompany._id });
    }

    res.status(400);
    throw new Error("registration failed");
  }

  const updateNewUser = await User.findByIdAndUpdate(newUser._id, {
    $set: {
      company_id: newCompany._id
    }
  })

  // token generation
  const accessToken = generateToken({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
    company_id: newCompany._id
  });

  res.status(201).json({
    message: "successful",
    data: {
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      company_id: newUser.company_id
    },
    accessToken
  })

  // res.json({ message: "created successfully", data: newUser });
})



// @description:login user
// @route POST /api/auth/login
// @access public
const login = asyncHandler(async (req, res) => {
  if (!req.body || req.body === undefined) {
    res.status(400)
    throw new Error('Invalid request')
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("invalid login details");
  }

  if (await bcrypt.compare(password, user.password)) {

    const details = {
      email: user.email,
      id: user._id,
      role: user.role,
      company_id: user.company_id
    }

    const accessToken = generateToken(details);
    res.status(201).json({
      message: "login successful",
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken
    });
  } else {
    res.status(401);
    throw new Error("invalid login details");
  }



})
const logout = asyncHandler(async (req, res) => {
  // 
})

// 
// const logout = asyncHandler(async (req, res) => {
//   // Assuming the user's session or token is stored in a cookie
//   res.cookie('accessToken', '', { expires: new Date(0), httpOnly: true });
//   res.status(200).json({ message: 'logout successful' });
// });

const resetPassword = asyncHandler(async (req, res) => {

})

module.exports = {
  register,
  login,
  logout,
  resetPassword
}