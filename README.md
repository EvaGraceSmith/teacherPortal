

# LAB - Class 09

## Project: Teacher Portal

### Authors:

[Francisco Sanchez](https://github.com/c0d3cisco)

[Eva Grace Smith](https://github.com/EvaGraceSmith)

### Problem Domain

* Create a new application using API Server and Authentication Systems.

Our team was responsible for planning, executing, and presenting an application that showcases a Content Management System (CMS) using full RESTful CRUD operations.


### Links and Resources

- [GitHub Actions ci/cd](https://github.com/EvaGraceSmith/teacherportal)
- [Back-end deployment](https://teacher-portal.onrender.com)

### Collaborators

- Mark Smith

### Setup

    PORT=<your-port-choice>
    DATABASE_URL=
    SECRET=<insert-secret-here>

#### How to initialize/run your application (where applicable)

"start": "node index.js"


#### Features / Routes


- GET : `/router/index/classrooms` - get all classroom records
- GET : `/router/index/classrooms/:id` - get a specific classroom record
- POST : `/router/index/classrooms` - update a classroom record
- PUT : `/router/index/classrooms/:id` updated a classroom record by id
- PATCH : `/router/index/classrooms/:id` update a classroom record by id
- DELETE : `/router/index/delete` delete a classroom record

#### Tests

- npm test will run all test suites


#### UML

![UML](./img/class-09-uml.png)
