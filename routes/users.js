'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models').User;

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}


router.get('/', asyncHandler(async (req, res) => {
    let users = await User.findAll();
    res.json(users)
}));

router.post('/', asyncHandler(async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).location('/').end();
    } catch (error) {
        res.status(400).json({ message: error })
    }
}))

module.exports = router;