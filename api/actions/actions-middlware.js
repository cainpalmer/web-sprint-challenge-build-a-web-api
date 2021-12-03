
// Imports
const Action = require('./actions-model');

// Middlewares
function validatePost (req, res, next) {
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
        next({
            status: 400,
            message: 'missing field',
        })
    } else {
        next()
    }
}

async function validateActionId (req, res, next) {
    try {
        const {id} = req.params
        const action = await Action.get(id)
        if (action) {
            req.action = action
            next()
        } else {
            res.status(404).json({
                message: 'action not available'
            })
        }
    } catch(err) {
        next(err)
    }
}


async function validateAction (req, res, next) {
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
        next({
            status: 400,
            message: 'missing field',
        })
    } else {
        next()
    }
}

// Exports
module.exports = {validateActionId, validateAction, validatePost}