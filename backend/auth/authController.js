const axios = require('axios');
const jwt = require('jsonwebtoken');
const {User} = require('../models/User')
const roleEnum = require('../models/User')
require('dotenv').config();

async function authenticateWithGoogle(req, res) {
    console.log("Request Reqcived",req.body)
  const { idToken } = req.body;

  try {
    // Verify Google token
    const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`);
    const { sub, name, email,picture } = googleResponse.data;

    // Check if the user already exists in the database
    let user = await User.findOne({ email: email });


    if (!user) {
      // Create a new user in the database
      user = new User({
        role:roleEnum.STUDENT,
        name,
        email,
        picture
      });
      await user.save();
    }

    // Generate JWT token with expiration of 1 day (24 hours)
    const jwtToken = jwt.sign({ userId: user._id, email,role:roleEnum.STUDENT,name}, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });

    res.status(200).json({message:"success", token: jwtToken });
  } catch (error) {
    console.error('Google Sign-In error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = { authenticateWithGoogle };
