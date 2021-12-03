
// Imports
const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();
const {validateActionId, validateAction, validatePost} = require('./actions-middlware');

// Routers
router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
})

router.get('/:id', validateActionId, async (req, res, next) => {
    try {
        res.json(req.action)
    } catch(err) {
        next(err)
    }
})

router.post('/', validatePost, (req, res, next) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try{
        await Action.remove(req.params.id)
        res.json(res.Action)
    } catch(err) {
        next(err)
    }
})

// Exports
module.exports = router