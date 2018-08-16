# StackOverflow-lite
StackOverflow-lite is a platform where people can ask questions and provide answers.

[![Build Status](https://travis-ci.org/uwaelpis/StackOverflow-lite.svg?branch=develop)](https://travis-ci.org/uwaelpis/StackOverflow-lite)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f825ed59ea572f98f4cc/test_coverage)](https://codeclimate.com/github/uwaelpis/StackOverflow-lite/test_coverage)

## Table of Contents

 * [Technologies](#technologies)
 * [Features](#features)
    *[Additional Feature](#additional-feature)
 * [API Endpoints](#api-endpoints)
 * [Getting Started](#getting-started)
    * [Installation](#installation)
    * [Testing](#testing)
    

### Pivotal Tracker
Project is currently being built with the Project Management Tool, Pivotal Tracker at [https://www.pivotaltracker.com/n/projects/2189288](https://www.pivotaltracker.com/n/projects/2189288)

### Template
Template is hosted at [https://uwaelpis.github.io/StackOverflow-lite/UI/index.html](https://uwaelpis.github.io/StackOverflow-lite/UI/index.html)

## Technologies

* [NodeJS](https://nodejs.org/) - Runtime Environment
* [ExpressJs](https://expressjs.com/) - Web Application Framework


### Supporting Packages

#### Linter(s)

* [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript

#### Test Tools

* [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node

## Features

* Users can create an account and log in.
* Users can post questions.
* Users can delete the questions they post.
* Users can post answers.
* Users can view the answers to questions.
* Users can accept an answer out of all the answers to his/her question as the preferred
answer.

## Additional Feature

* Users can upvote or downvote an answer.
* Users can comment on an answer.
* Users can fetch all questions he/she has ever asked on the platform
* Users can search for questions on the platform
* Users can view questions with the most answers.

## API Endpoints

###

<table>

<tr><th>VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>


<tr><td>GET</td> <td>api/v1/questions</td> <td>Get All Questions</td></tr>

<tr><td>POST</td> <td>api/v1/questions</td> <td> Add a question</td></tr>

<tr><td>DELETE</td> <td>api/v1/questions/:questionId</td> <td>Delete an Existing Question</td></tr>

<tr><td>GET</td> <td>api/v1/questions/:questionId</td> <td>Get a Question</td></tr>

<tr><td>GET</td> <td>api/v1/questions/:questionId/answers</td> <td>Get All the answers to a Question</td></tr>

<tr><td>POST</td> <td>api/v1/questions/:questionId/answers</td> <td>Add answer to a Question</td></tr>

</table>

## Getting Started

### Installation

* git clone
  [StackOverflow Lite](https://github.com/uwaelpis/StackOverflow-lite.git)
* Run `npm install` to install packages
* Run `npm start` to start the server
* Navigate to [localhost:4000](http://localhost:4000/) in browser to access the
  application

### Testing

#### Prerequisites

* [Postman](https://getpostman.com/) - API Toolchain

#### Testing with Postman

* After installing as shown above
* Navigate to [localhost:4000](http://localhost:4000/) in
  [Postman](https://getpostman.com/) to access the application


[Nodemon](https://nodemon.io/) watches for file changes and restarts your code. 

