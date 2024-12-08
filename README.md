# Task Management REST API

## Description
This API allows you to manage tasks with CRUD operations, built with Node.js, Express, and MongoDB.

## Installation
1. Install dependencies: `npm init -y`
2. Add a `.env` file with username ,password and port number and conncet to  your MongoDB database.
3. Start the server: `npm run dev`

## Models 
1. create a schema in mongodb database with the given schema values
2. Connect that schema with routes to send ,update,delete and get the data from database

## Endpoints
- **POST /tasks**: Create a new task.
- **GET /tasks**: Retrieve all tasks .
- **GET /tasks/:id**: Retrieve a specific task by ID.
- **PUT /tasks/:id**: Update a task.
- **DELETE /tasks/:id**: Delete a task.