
// Imports
const Action = require('./actions-model');

// Middlewares
async function validateActionId (req, res, next) {
    try {
        
        const action = await Action.get(req.params.id)

        if (!action) {
            res.status(404).json({message: 'no action here'})
        } else {
            req.action = action
            next()
        }
    } catch (err) {
        res.status(500).json({message: 'an error occured'})
    }
}

async function validateAction (req, res, next) {

    const {project_id, description, notes, completed} = req.body    
    
    if (!project_id) {
        res.status(400).json({
            message: 'Please input an id'})
    } else if (!description || !description.trim()) {
        res.status(400).json({
            message: 'please input a description'})
    } else if (!notes || !notes.trim()) {
        res.status(400).json({
            message: 'please input notes'
        })
    } else {
        req.project_id = project_id
        req.description = description.trim()
        req.notes = notes.trim()
        req.completed = completed
        next()
    }
}

// Exports
module.exports = {validateActionId, validateAction}