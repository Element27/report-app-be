const express = require('express');
const { createCompany, getAllCompany, getCompany, updateCompany, deleteCompany } = require('../controller/companyController');
const validateToken = require('../middleware/authMiddleware');

const router = express.Router();
router.use(validateToken);
// router.post("/", createCompany);
router.get("/", getAllCompany);
// router.get("/:id", getCompany);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);


module.exports = router;