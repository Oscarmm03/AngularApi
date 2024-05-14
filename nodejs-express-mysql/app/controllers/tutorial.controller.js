const Tutorial = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    const tutorial = new Tutorial({
        name: req.body.name,
        price: req.body.price,
        extended_description: req.body.extended_description,
        category: req.body.category,
        sale: req.body.sale || false,
        image: req.body.image,
    });

    // Save Tutorial in the database
    Tutorial.create(tutorial, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        else res.send(data);
    });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;

    Tutorial.getAll(name, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

// Find a single Tutorial with a id
exports.findOne = (req, res) => {
    Tutorial.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Tutorial.updateById(
        req.params.id,
        new Tutorial(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tutorial with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tutorial with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Tutorial.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Tutorial with id " + req.params.id
                });
            }
        } else res.send({ message: `Tutorial was deleted successfully!` });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        else res.send({ message: `All Tutorials were deleted successfully!` });
    });
};

exports.findByCategory = (req, res) => {
    const category = req.params.category;

    Tutorial.findByCategory(category, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials by category."
            });
        else res.send(data);
    });
};


exports.findOnSale = (req, res) => {
    Tutorial.findOnSale((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials on sale."
            });
        else res.send(data);
    });
};

exports.findByPriceRange = (req, res) => {
    const min = req.params.min;
    const max = req.params.max;

    Tutorial.findByPriceRange(min, max, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials by price range."
            });
        else res.send(data);
    });
};

exports.findWithExtendedDescription = (req, res) => {
    Tutorial.findWithExtendedDescription((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials with extended descriptions."
            });
        else res.send(data);
    });
};