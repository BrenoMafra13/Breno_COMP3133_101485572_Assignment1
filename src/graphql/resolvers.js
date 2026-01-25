const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const cloudinary = require('../config/cloudinary');

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

    getAllEmployees: async () => {
      try {
        return await Employee.find();
      } catch (error) {
        throw new Error(error.message);
      }
    },

    getEmployeeById: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        if (!employee) throw new Error("Employee not found");
        return employee;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    searchEmployee: async (_, { designation, department }) => {
      try {
        const query = {};
        if (designation) query.designation = designation;
        if (department) query.department = department;
        return await Employee.find(query);
      } catch (error) {
        throw new Error(error.message);
      }
    }
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

    addEmployee: async (_, args) => {
      try {
        let imageUrl = "";
        if (args.employee_photo) {
          const uploadResponse = await cloudinary.uploader.upload(args.employee_photo, {
            folder: "comp3133_assignment1"
          });
          imageUrl = uploadResponse.secure_url;
        }

        const newEmployee = new Employee({
          ...args,
          employee_photo: imageUrl
        });

        return await newEmployee.save();
      } catch (error) {
        throw new Error(error.message);
      }
    },

    updateEmployeeById: async (_, { id, ...updateFields }) => {
      try {
        updateFields.updated_at = new Date();
        const updatedEmployee = await Employee.findByIdAndUpdate(
          id,
          { $set: updateFields },
          { new: true, runValidators: true }
        );
        if (!updatedEmployee) throw new Error("Employee not found");
        return updatedEmployee;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    deleteEmployeeById: async (_, { id }) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) throw new Error("Employee not found");
        return "Employee deleted successfully";
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = resolvers;