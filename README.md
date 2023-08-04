# **Polling System API**

An API based polling system built with Nodejs and MongoDB.

## [**Live Demo**](https://polling-system-api-184l.onrender.com/api/v1/questions/64cd5dcb55ace4f5a4302f27)

### **Features**

- Create a question
- Add options to a question
- Add a vote to an option of question
- Delete a question (a question can't be deleted if one of its options has votes)
- Delete an option (an option can't be deleted if it has even one vote given to it)
- View a question with its options and all the votes given to it

### **Tech Stack**

- Javascript, Node.js, Express.js, MongoDB

### **How to Install Project**

- Clone the project onto your local machine.
- Run 'npm install' to install required dependencies.
- Run 'npm start' in terminal to start server.
- Test your API using Postman.
