require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const route = require('./routes')
const port = 3000

let app= express()

mongoose.connect('mongodb://localhost/NAME_DATABASE', {useNewUrlParser: true})
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/', route)

app.listen(port, ()=>{

    console.log(`Listen on port`);
})

module.exports = app

const router = require('express').Router()
const question = require('./question')
const user = require('./user')
const answer = require('./answer')

router.use('/questions', question)
router.use('/answers', answer)
router.use('/user', user) //done

module.exports = router

const router = require('express').Router()
// import controllernya
const {authentication, authorization} = require('../middleware/auth')

router.get('/', [NAMA_CONTROLLER].findAll)
router.get('/:id', [NAMA_CONTROLLER].findOne)
router.post('/', authentication, [NAMA_CONTROLLER].create)
router.delete('/:id', [NAMA_CONTROLLER].delete)
router.put('/:id', [NAMA_CONTROLLER].update)

module.exports = router 


const Model = require('../models/user')
const { hash, compare } = require('../helpers/bcrypt')
const { sign, verify } = require('../helpers/jwt')
const {mailOptions, transporter} = require('../helpers/nodemailer')
const kue = require('kue')
const queue = kue.createQueue()

queue.process('email', function(val, done){
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }else{
            done()
        }
    })
})

class User {
    static create(req, res) {
        let newUser = new Model({
            name: req.body.name,
            email: req.body.email,
            password: hash(req.body.password)
        })
        Model.create(newUser)
            .then(data => { 
                mailOptions.to = req.body.email                 // OPTIONAL
                queue.create('email').save()                    // OPTIONAL

                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static login(req, res) {

        Model.findOne({ email: req.body.email })
            .then(found => {

                if (compare(req.body.password, found.password)) {
                    let jwt = sign({ _id: found._id, name: found.name, email: found.email })

                    if (found.role) {
                        res.status(201).json({ token: jwt, id: found._id, role: found.role })
                    } else {
                        res.status(201).json({ token: jwt, id: found._id, })

                    }
                }
            })
    }

    static findAll(req, res) {
        Model.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        Model.findOneAndDelete({ _id: req.params.id })
            .then(data => {
                res.status(200).json("Delete Success")
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = User

"npm i bcryptjs cors express jsonwebtoken mongoose"