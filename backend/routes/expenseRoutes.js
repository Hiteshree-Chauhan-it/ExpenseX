const express = require('express');
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addExpense', protect, addExpense);
router.get('/getExpenses', protect, getExpenses);
router.put('/updateExpense/:id', protect, updateExpense);
router.delete('/deleteExpense/:id', protect, deleteExpense);

module.exports = router;
