const db = require("../models");
const MyApp = db.myapp;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            message: "Content cant be empty!"
        });
        return;
    }

    const myapp = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    MyApp.create(myapp).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the my app."
        });
    });
};

exports.findAll = (req, res) => {
    
};

exports.findOne = (req, res) => {
    
};

exports.update = (req, res) => {
    
};

exports.delete = (req, res) => {
    
};

exports.deleteAll = (req, res) => {
    
};

exports.findAllPublished = (req, res) => {
    
};
