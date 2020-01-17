const express = require('express');
const Actions = require('../data/helpers/actionModel');
const Project = require('../data/helpers/projectModel');
const router = express.Router();

// GET request to /api/actions
router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "The actions information could not be retrieved."})
        })
})

// POST request to /api/actions
router.post('/', (req, res) => {
    const {project_id, description, notes} = req.body;
    Actions.insert(req.body)
        .then(action => {
            if (!project_id || !description || !notes) {
                res.status(400).json({error: "Please provide project_id or description or notes for the project."})
            } else {
                res.status(200).json(action)
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "There was an error while saving the action to the database."})
        })
})

// GET request to /api/actions/:id
router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({error: "Action could not be found."})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "The action could not be retrieved."})
        })
})

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json(deleted)
            } else {
                res.status(404).json({error: "The action with the specified ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "The action could not be retrieved."})
        })
})

router.put('/:id', (req, res) => {
    const {project_id, description, notes} = req.body;
    Actions.update(req.params.id, req.body)
        .then(action => {
            if (!req.params.id) {
                res.status(404).json({error: "The action with the specified ID does not exist."})
            } else if (!project_id || !description || !notes) {
                res.status(400).json({error: "Please provide project_id or description or notes for the action."})
            } else {
                res.status(200).json(action)
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "The action could not be updated."})
        })
})


module.exports = router;