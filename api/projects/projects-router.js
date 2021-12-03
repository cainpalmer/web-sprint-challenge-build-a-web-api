
// Imports
const express = require('express');
const Projects = require('./projects-model');
const router = express.Router();
const {validateProjectId, validateProject} = require('./projects-middleware');
router.use(express.json());

// Routers
router.get('/', (req, res) => {
    Projects.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({message: 'The projects could not be retrieved'})
    });
})

router.get('/:id', validateProjectId, async (req, res, next) => {
    try {
        res.status(200).json(req.params)
    } catch(err) {
        next(err)
    }
})

router.post('/', (req, res) => {

    const newProject = req.body

    Projects.insert(newProject)
    .then(project => {
        res.status(201).json(newProject)
    })
    .catch(err => {
        res.status(500).json({message: 'failed to add the project '})
    })
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {

    const {name, description, completed} = req.body

    if (!name || !description || !completed) {
        res.status(400).json({message: 'the project with that id does not exist'})
    } else {
        Projects.update(req.params.id, req.body)
        .then (() => {
            return Projects.get(req.params.id)
        })
        .then (project => {
            res.json(projects)
        })
        .catch(next)
    }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try{
        await Projects.remove(req.params.id)
        res.json(res.Projects)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        if(actions.length > 0) {
            res.status(200).json(actions)
        } else {
            res.status(404).json(actions)
        }
    })
    .catch(next)
})

// Exports
module.exports = router