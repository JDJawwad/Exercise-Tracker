const { query } = require('express');
const express = require('express')
const router = express.Router();
const Exercise = require('../models/exercise.model')

router.get('/', (req,res)=>{
    console.log("ddd")
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(404).json(`Error ${err}`))
})

router.post('/add',(req,res)=>{
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    console.log(req.body)
    
    const newExercise = new Exercise({username,description,duration,date})

    newExercise.save()
    .then(()=>res.json('Exercise Added'))
    .catch(err=> res.status(404).json(`Error ${err}`))
})

router.get('/:id',(req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(404).json(`Error ${err}`))
})

router.get('/search/:text',(req,res)=>{
    
    Exercise.find({username:new RegExp (`^${req.params.text}`,'gi')})
    .then(exercise=>res.json(exercise))
    .catch(err => res.status(404).json(`Error ${err}`))
})

router.delete('/:id',(req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise Deleted'))
    .catch(err => res.status(404).json(`Error ${err}`))
})

router.put('/update/:id',(req,res)=>{
    Exercise.findByIdAndUpdate(req.params.id)
    .then(exercise => {
        console.log(exercise)
        exercise.username = req.body.username
        exercise.description = req.body.description
        exercise.duration = Number(req.body.duration)
        exercise.date = Date.parse(req.body.date)
        
        //updating it and then saving the updated data into the database
        exercise.save()
        .then(()=> res.json('Exercise Updated'))
        .catch(err => res.status(404).json(`Error ${err}`))
    })
    .catch(err => res.status(404).json(`Error ${err}`))
})

module.exports = router