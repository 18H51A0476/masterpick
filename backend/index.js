const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectToMongoDB = require('./db/mongoDBConnection');
const authRouter = require("./routes/authRouter")
require('dotenv').config();
const port = process.env.PORT || 3000;

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRouter);


connectToMongoDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
