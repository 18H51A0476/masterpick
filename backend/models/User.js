const mongoose = require('mongoose');

// Define the roles enum with mappings
const roleEnum = {
  ADMIN: 'admin',
  STUDENT: 'student',
  TRAINER: 'trainer',
};

// Extract allowed role values from the enum object
const allowedRoles = Object.values(roleEnum);

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      required: false,
      index: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    rollNumber: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    college: {
      type: String,
      required: false,
    },
    branch: {
      type: String,
      required: false,
    },
    linkeden: {
      type: String,
      required: false,
    },
    picture: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: allowedRoles, // Use the allowedRoles for validation
      default: roleEnum.STUDENT, // Set a default role using the enum value
    },
  },
  {
    timestamps: true,
  }
);

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

// Export the User model and the roles enum with mappings
module.exports = {
  User,
  roleEnum,
};
