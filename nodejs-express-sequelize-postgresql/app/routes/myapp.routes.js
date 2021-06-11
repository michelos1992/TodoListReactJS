module.exports = app => {
    const myapps = require("../controllers/myapp.controller");

    var router = require("express").Router();

    router.post("/", myapps.create);
    router.get("/", myapps.findAll);
    router.get("/published", myapps.findAllPublished);
    router.get("/:id", myapps.findOne);
    router.put("/:id", myapps.update);
    router.delete("/:id", myapps.delete);
    router.delete("/", myapps.deleteAll);

    app.use('/api/myapps', router);

};
