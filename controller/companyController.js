const asyncHandler = require('express-async-handler');


const Company = require('../model/companyModel');
const User = require('../model/userModel');


// @description: creates a company
// @route POST /api/company
// @access private

// const createCompany = asyncHandler(async (req, res) => {
//   // console.log(req.user);
//   // check if user is super admin
//   if (req.user.role !== 'super-admin') {
//     res.status(401);
//     throw new Error('Unauthorised');
//   }

//   // a check for company count. user cannot have more than one compay to their id.
//   const count = await Company.find({ user_id: req.user.id });

//   if (count.length >= 1) {
//     res.status(400);
//     throw new Error("You cannot have more than 1")
//   }

//   // console.log(req.body)

//   const { name, description } = req.body;

//   if (!name) {
//     res.status(400);
//     throw new Error("name is required");
//   }

//   // create the company
//   const company = await Company.create({
//     name,
//     description,
//     user_id: req.user.id
//   })

//   if (!company) {
//     res.status(400);
//     throw new Error("failed to create company");
//   }


//   // update the user's company id
//   const user = await User.findOne({ _id: req.user.id });

//   // console.log("user", user)
//   if (!user) {
//     res.status(400)
//     throw new Error("Unauthrised");
//   }


//   user.company_id = company._id;
//   await user.save();

//   res.json({ message: "so far so good", data: company });

// })


// @description: fetch all companies by a user
// @route GET /api/company
// @access private

const getAllCompany = asyncHandler(async (req, res) => {

  if (req.user.role !== 'super-admin') {
    res.status(401);
    throw new Error('Unauthorised');
  }

  const companies = await Company.find({ user_id: req.user.id });

  res.json({ message: "Successful", data: companies })
})


// @description: get a single company
// @route GET /api/company/:id
// @access private

// const getCompany = asyncHandler(async (req, res) => {
//   // console.log(req.user);
//   if (req.user.role !== 'super-admin') {
//     res.status(401);
//     throw new Error('Unauthorised');
//   }
//   const { id } = req.params;

//   const company = await Company.findById(id);
//   console.log(company)
//   if (!company) {
//     res.status(400)
//     throw new Error("company not found")
//   }

//   res.json({ message: "successful", data: company });

// })


// @description: update a company
// @route PUT /api/company/:id
// @access private

const updateCompany = asyncHandler(async (req, res) => {

  if (req.user.role !== 'super-admin') {
    res.status(401);
    throw new Error('Unauthorised');
  }

  const { id } = req.params;

  const company = await Company.findById(id);

  if (!company) {
    res.status(400)
    throw new Error("company not found")
  }

  const { name, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("name is required");
  }

  const exists = await Company.findOne({ name });

  if (exists) {
    res.status(400);
    throw new Error("company name is already in use");
  }

  if (req.user.id !== company.user_id) {
    res.status(401);
    throw new Error('Unauthorised');
  }

  const updatedCompany = await Company.findByIdAndUpdate(id, req.body, { new: true });

  res.json({ message: "successful", data: updatedCompany });


})


// @description: delete a company
// @route DELETE /api/company/:id
// @access private

const deleteCompany = asyncHandler(async (req, res) => {
  // console.log(req.user);

  if (req.user.role !== 'super-admin') {
    res.status(401);
    throw new Error('Unauthorised');
  }

  const { id } = req.params;

  const company = await Company.findById(id);

  if (!company) {
    res.status(400)
    throw new Error("company not found")
  }

  if (req.user.id !== company.user_id) {
    res.status(401);
    throw new Error('Unauthorised');
  }


  const deletedCompany = await Company.findByIdAndDelete(id);

  res.json({ message: "successful", data: deletedCompany });
})


module.exports = {
  // createCompany,
  getAllCompany,
  // getCompany,
  updateCompany,
  deleteCompany,
}