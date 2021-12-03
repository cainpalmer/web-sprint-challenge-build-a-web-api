
// Imports
const Projects = require('./projects-model');

// Middlewares
async function validateProjectId (req, res, next) {
    try {
        
        const {id} = req.params
        const project = await Projects.get(id)

        if (project) {
            req.params = project
            next()
        } else {
            res.status(404).json({
                message: 'project with that id cannot be found'
            })
        }
    } catch (err) {
        next(err)
    }
}

async function validateProject (req, res, next) {

    const {name, description, completed} = req.body    
    
    if (!name || !name.trim()) {
        res.status(400).json({
            message: 'Please input a name'})
    } else if (!description || !discription.trim()) {
        res.status(400).json({
            message: 'please input a discription'})
    } else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
}

// Exports
module.exports = {validateProjectId, validateProject}