const express = require('express');

const router = express.Router();
const mongoose = require('mongoose')
const Fact = require('./models/fact')


router.get('/', (req, res, next) => {
    // GET A RANDOMN FACT

    Fact
        .countDocuments()
        .exec((err, count) => {
            var random = Math.floor(Math.random() * count)

            Fact
                .findOne()
                .skip(random)
                .exec()
                .then(result => {
                    console.log(result)
                    res.status(200).json(result)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(err)
                })
        })

    // GET ALL THE FACTS

    // Fact.find()
    //     .exec()
    //     .then(docs => {
    //         console.log(docs);
    //         res.status(200).json(docs)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         })
    //     })
})

//POST a fact
router.post('/', (req, res, next) => {
    //create instance of that fact
    const fact = new Fact({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        author: req.body.author
    })
    fact
        .save()
        .then((result => {
            console.log(result)
            res.status(200).json({
                message: 'POST request works',
                createdFact: result
            })
        }))
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})


//Delete a particular fact
router.delete('/:factsId', (req, res, next) => {
    const id = req.params.factsId;
    Fact.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router