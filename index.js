const express = require('express');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();
const connectDb = require('./config/dbConnection');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/transactions', require('./routes/transactionsRoute'));
app.use('/api/users', require('./routes/usersRoute'));
app.use('/api/accounts', require('./routes/accountRouter'));
app.use(errorHandler);



connectDb()
app.listen(PORT, () => {
  console.log("Live on port", PORT);
});