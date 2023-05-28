

# LAB - Class 09

## Project: Teacher Portal

### Authors: [Francisco Sanchez](https://github.com/c0d3cisco)

Eva Grace Smith

### Problem Domain



### Links and Resources

- [GitHub Actions ci/cd](https://github.com/EvaGraceSmith/teacherportal)
- [Back-end deployment](https://teacher-portal.onrender.com)

### Collaborators

-

### Setup

    PORT=<your-port-choice>
    DATABASE_URL=
    SECRET=<insert-secret-here>

#### How to initialize/run your application (where applicable)

"start": "node index.js"

#### How to use your library (where applicable)

#### Features / Routes

- Routes could also use clothes or signin(post), signup(post), users(get), secret(get).
- Certain routes within v2 and user options will require basic or bearer auth.
- GET : `/router/index/classrooms` - get all classroom records
- GET : `/router/index/classrooms/:id` - get a specific classroom record
- POST : `/router/index/classrooms` - update a classroom record
- PUT : `/router/index/classrooms/:id` updated a classroom record by id
- PATCH : `/router/index/classrooms/:id` update a classroom record by id
- DELETE : `/router/index/delete` delete a classroom record

#### Tests

- npm test will run all test suites
- v2 route tests bring in bearer and basic auth for testing

#### UML

![UML](./img/class-09-uml.png)
