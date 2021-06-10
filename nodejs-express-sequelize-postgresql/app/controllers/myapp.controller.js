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
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%`}} : null;

    MyApp.findAll({ where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving my app."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    MyApp.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving my app with id="+id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    MyApp.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "My app was updated success."
            });
        } else {
            res.send({
                message: `Cant update my app with id=${id}. Maybe app wasn found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating app with id="+id
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    MyApp.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "My app was deleted success."
            });
        }else {
            res.send({
                message: `Cant delete app with id=${id}. Maybe app was not found`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Cant delete item with id="+id
        });
    });
};

exports.deleteAll = (req, res) => {
    MyApp.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} my app were deleted success!`});
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while removing all items."
        });
    });
};

exports.findAllPublished = (req, res) => {
    
};
