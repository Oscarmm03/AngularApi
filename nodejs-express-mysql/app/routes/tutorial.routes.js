module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", tutorials.create);

    // Retrieve all Tutorials
    router.get("/", tutorials.findAll);

    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);

    // Update a Tutorial with id
    router.put("/:id", tutorials.update);

    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);

    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);

    // New routes
    // Retrieve all Tutorials by category
    router.get("/category/:category", tutorials.findByCategory);

    // Retrieve all Tutorials on sale
    router.get("/sale", tutorials.findOnSale);

    // Retrieve all Tutorials by price range
    router.get("/price/:min/:max", tutorials.findByPriceRange);

    // Retrieve all Tutorials with extended descriptions
    router.get("/extended", tutorials.findWithExtendedDescription);

    // Add more routes as needed

    app.use('/api/tutorials', router);
};
