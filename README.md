# bhklab-website
Lab Website using MERN (MongoDB, Express, React, Node.js) stack, which serves as a platform for showcasing our research projects, publications, members, and other lab-related information. The database is shared with Caboodle.

## Setup
To run this project locally, you will need to have Node.js and MongoDB installed on your machine. You can then follow these steps:

Clone the repository to your local machine:

- Copy code `git clone https://github.com/bhklab/bhklab-website.git`
- Move to `bhklab-website` directory
- Install dependencies by running `npm install` at root
- Move to `client` directory
- Install dependencies by running `npm install`

## Start the App
- Start the backend by running `npm start` at the root directory
- Start the client by running `npm start` at the client directory
- This will start the server at http://localhost:3000

## Database seeding
- Include a correct MONGODB_URL connection string in the .env file
- Place seed files for each collection (.json file) under `databases/maintenance/data` directory
- Navigate to the databases/maintenance/ directory in your terminal or command prompt
- Run `node restore.js` in `databases/maintenance/` directory to seed the database

## Technologies Used
This project uses the following technologies:

- MongoDB, Express, React, Node.js
- This project uses a shared database with Caboodle, which is a database management system for internal lab project/grant management. The database contains information on our lab's research projects, data, and publications. Any changes made to the database through this website will be reflected in Caboodle, and vice versa.

## Contributing
If you would like to contribute to this project, please follow the standard Git workflow:

Fork the repository
Create a new branch for your feature or bug fix
Commit your changes and push your branch to your fork
Create a pull request from your branch to the main repository

## License
This project is licensed under the MIT License. See the LICENSE file for details.
