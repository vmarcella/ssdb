# Spreadsheet DB
![GitHub repo size](https://img.shields.io/github/repo-size/C3NZ/ssdb?style=plastic)


## Description
The goal of this project is to create a lightweight database that can be used for prototyping
and hackathon projects. This database being built will rely on the google spreadsheet API, and is not meant
to be used in production. It will provide an easy to use interface for CRUDing resources.

## Getting started
First to obtain the project:
```
git clone https://github.com/C3NZ/ssdb.git
```

Second to connect, you need to get your credentials from google apis for connecting to the app.
After those credentials are created, you can then use a similar layout in your project to get the database
connection going.
```
const { connect } = require('ssdb');

const config = {
  credentialsPath: './credentials.json',
  tokenPath: './token.json',
};

connect(config).then(() => {
    ...
});

```
Which will load the connection to the database. After that, you can export the `getDB` and `createDB` functions
from the `ssdb` package to get a `SheetDB` instance that will allow you to start working with your spreadsheet
from the command line.

The project is still very barebones, but development is active and looking to improve.


## To dos
 - Add documentation to the project readme.
 - Extend functionality for creating tables.
 - Publish googleapis wrapper for creating the DB.
 - Publish package to NPM.
 - Add testing and code coverage for all functions

## Goals
 - Create a simple and easy to use database.
 - Minimize the amount of steps needed to authenticate and setup a database.
 - Allow people building all sorts of projects to use an easily attachable/detachable database system
 for prototyping.

## API
 - Need to add documentation

## Resources

