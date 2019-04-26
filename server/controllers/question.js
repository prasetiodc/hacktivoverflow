const Model = require('../models/question')

class Question{
    static findAll(req, res){
        Model.find()
        .populate('userId')
        .populate({ 
            path: 'answers',
            populate: {
                path: 'userId'
                } 
            })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static findMine(req, res){
        Model.find({userId:{_id :req.userId}})
        // .populate('userId')
        // .populate({ 
        //     path: 'answers',
        //     populate: {
        //         path: 'userId'
        //         } 
        //     })
        .then(data=>{
            console.log(">>>>>>>>>>>>>",data);
            
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static create(req, res){
        let newQuestion = new Model({
            title: req.body.title,
            description: req.body.description,
            upvotes: 0,
            downvotes: 0,
            answers: [],
            userId: req.userId
        })
        Model.create(newQuestion)
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static findOne(req, res){
        Model.findById(req.params.id)
        .populate('answers')
        .populate('userId')
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static delete(req, res){
        Model.deleteOne({_id:req.params.id})
        .then(data=>{
            res.status(200).json("Delete Success")
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static update(req, res){
        let newData = {
            title: req.body.title,
            description: req.body.description,
        }
        Model.findOneAndUpdate({_id:req.params.id}, { $set: newData }, {new:true})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static upvote(req, res){
        Model.findById(req.params.id)
        .then(found=>{
            let up = found.upvotes+1

            return Model.findOneAndUpdate({_id:req.params.id}, {upvotes : up}, {new:true})
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static downvote(req, res){
        Model.findById(req.params.id)
        .then(found=>{
            let down = found.downvotes+1

            return Model.findOneAndUpdate({_id:req.params.id}, {downvotes : down}, {new:true})
        })
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = Question