'use strict';

const express = require('express');
const router = express.Router();
const Course = require('../models').Course;
const User = require('../models').User;


/*

A /api/courses GET route that will return all courses including the User associated with each course and a 200 HTTP status code.
A /api/courses/:id GET route that will return the corresponding course including the User associated with that course and a 200 HTTP status code.
A /api/courses POST route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content.
A /api/courses/:id PUT route that will update the corresponding course and return a 204 HTTP status code and no content.
A /api/courses/:id DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content.
Test your routes

*/

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}

//A /api/courses GET route that will return all courses including the User associated with each course and a 200 HTTP status code.
router.get('/', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
        include: [{ model: User }]
    });
    if (courses) {
        res.json(courses);
    } else {
        res
            .status(404)
            .json({ message: "No Courses FOUND!" });
    }
}));