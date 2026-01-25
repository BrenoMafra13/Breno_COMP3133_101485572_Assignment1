# Employee Management System (Backend) - COMP3133 Assignment 1

**Student Name:** Breno Lopes Mafra  
**Student ID:** 101485572

## Project Overview
This is a full-featured Backend application for an Employee Management System developed. The project includes user authentication (Signup/Login) and comprehensive Employee CRUD operations, including cloud-based profile picture storage.

## Features & Requirements (Assignment 1)
- **User Authentication:** Secure Signup and Login using password encryption.
- **Employee Management:** Full CRUD (Create, Read, Update, Delete) operations via GraphQL Mutations and Queries.
- **Cloudinary Integration:** Automatically uploads and stores employee profile pictures on Cloudinary.
- **Database Constraints:** - Salaries must be at least 1000.
  - Gender is restricted to Male, Female, or Other.
  - Emails are unique for both Users and Employees.

## Tech Stack
- **Backend:** Node.js & Express.js
- **API Architecture:** GraphQL (Apollo Server)
- **Database:** MongoDB Atlas
- **Media Storage:** Cloudinary
- **Security:** Bcrypt for password hashing

## Prerequisites
- Node.js installed
- A MongoDB Atlas cluster
- A Cloudinary account

## Installation & Setup
1. Clone this repository:
   ```bash
   git clone https://github.com/BrenoMafra13/Breno_COMP3133_101485572_Assignment1

2. Navigate to the project directory and install dependencies:
   ```bash
   cd Breno_COMP3133_101485572_Assignment1
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```  
4. Start the server:
   ```bash
   npm start
   ```  
5. Access the GraphQL Playground at `http://localhost:4000/graphql` to interact with the API.   

## Username for login testing

- **Username:** breno_mafra
- **Email:** breno@georgebrown.ca
- **Password:** 12345678

{
  "username": "breno_mafra",
  "email": "breno@georgebrown.ca",
  "password": "12345678"
}

## API Endpoints (Graphql):
* **Signup (Mutation)**: Create a new user account with username, email, and password.
* **Login (Query)**: Authenticate using username/email and password.
* **Get All Employees (Query)**: Returns a list of all registered employees.
* **Add New Employee (Mutation)**: Creates a new record and uploads the profile picture to 
* **Search Employee by ID (Query)**: Retrieves full details of a specific employee using their ID.
* **Update Employee (Mutation)**: Updates details (salary, designation, etc.) of an existing employee.
* **Delete Employee (Mutation)**: Removes an employee record by their ID.
* **Search by Dept/Designation (Query)**: Filters the employee list by department or job title.

## Deployment
This application is not deployed, all the progress is done in the GitHub repository.