const express = require('express');

const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

// GET request to /api/projects
router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "The projects information could not be retrieved."})
        })
})

// POST request to /api/projects
router.post('/', (req, res) => {
    const {name, description} = req.body;
    Projects.insert(req.body)
        .then(project => {
            if (!name || !description) {
                res.status(400).json({error: "Please provide name and description for the project."})
            } else {
                res.status(201).json(project)
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "There was an error while saving the post to the database."})
        })
})

// GET request to /api/projects/:id
router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({error: "Project could not be found."})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "The project could not be retrieved."})
        })
})

// DELETE request to /api/projects/:id
router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json(deleted)
            } else {
                res.status(404).json({error: "The project with the specified ID does not exist."})
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "The project could not be retrieved."})
        })
})

// PUT request to /api/projects/:id
router.put('/:id', (req, res) => {
    const {name, description} = req.body;
    Projects.update(req.params.id, req.body)
        .then(project => {
            if (!req.params.id) {
                res.status(404).json({error: "The project with the specified ID does not exist."})
            } else if (!name || !description) {
                res.status(400).json({error: "Please provide name and description for the project."})
            } else {
                res.status(200).json(project)
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "The project could not be updated."})
        })
})

// // GET request to /api/projects/:id/actions
// router.get('/:id/actions', (req, res) => {
//     Projects.getProjectActions(req.params.id)
//         .then(actions => {
//             const action = actions[0]
//             if (!action) {
//                 res.status(404).json({error: "Actions could not be found."})
//             } else {
//                 res.status(200).json(action)
//             }
//         })
//         .catch(error => {
//             console.log(error)
//             res.status(500).json({error: "Error getting the project's actions"})
//         })
// })

// GET request to /api/projects/:id/actions
router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            if (!actions[0]) {
                res.status(404).json({error: "Actions could not be found."})
            } else {
                res.status(200).json(actions)
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "Error getting the project's actions"})
        })
})

// // POST request to /api/projects/:id/actions
// router.post('/:id/actions', (req, res) => {
//     const {notes, description} = req.body;
//     project_id = Number(req.params.id)

//     Projects.getProjectActions(req.params.id)
//         .then(actions => {
//             if (!actions[0]) {
//                 res.status(404).json({error: "The action with the specified ID does not exist."})
//             }
//         })
//         Actions.insert({notes, description, project_id})
//             .then(hubs => {
//                 res.status(200).json(hubs)
//             })
//             .catch(error => {
//                 console.log(error)
//                 res.status(500).json({error: "Error adding action to project"})
//             })
// })

// function validateUserId() {
//     // do your magic!
//     return (req, res, next) => {
//       Projects.getProjectActions(req.params.id)
//         .then(project => {
//           if (project) {
//             req.project = project
//             next()
//           } else {
//             res.status(400).json({error: `Invalid user id from speciefied user of ${req.params.id}`})
//           }
//         })
//         .catch(error => {
//           console.log(error)
//           res.status(500).json({error: "Error finding project with sepecified ID"})
//         })
//     }
//   }


module.exports = router;