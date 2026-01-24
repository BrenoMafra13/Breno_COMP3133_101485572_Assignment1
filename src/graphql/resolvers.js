const User = require('../models/User');
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    login: async (_, { usernameOrEmail, password }) => {
      try {
        const user = await User.findOne({
          $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!user) {
          throw new Error('User not found. Please check your credentials.');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error('Invalid password. Please try again.');
        }
        return "Login successful!";
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      try {
        if (!email.includes('@')) {
          throw new Error("Invalid email format.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });

        return await newUser.save();
      } catch (error) {
        if (error.code === 11000) {
          throw new Error("Username or Email already exists.");
        }
        throw new Error(error.message);
      }
    },
  }
};

module.exports = resolvers;