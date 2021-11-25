const db = require("../models");
const User = db.user;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!(req.body.fname && req.body.lname && req.body.email && req.body.mobile && req.body.password)) {
        return res.status(400).send({ message: "Content empty!" });
    }

    // Create a User
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password
    });

    // Save User in the database
    user.save(user)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Some error occurred while creating the User." }));
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

    const fname = req.query.fname;
    var condition = fname ? { fname: { $regex: new RegExp(fname), $options: "i" } } : {};


    User.find(condition)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message || "Some error occurred while retrieving users." }));
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(data => {
            if (!data) return res.status(404).send({ message: "Not found User with id - " + id });
            else return res.send(data);
        })
        .catch(err => {
            return res.status(500).send({ message: "Error retrieving User with id - " + id });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    if (!(req.body.fname || req.body.lname || req.body.email || req.body.mobile || req.body.password)) {
        return res.status(400).send({ message: "Data to update can not be empty!" });
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) return res.status(404).send({ message: `Cannot update User with id=${id}. Maybe User was not found!` });
            else return res.send({ message: "User was updated successfully." });
        })
        .catch(err => res.status(500).send({ message: "Error updating User with id=" + id }));
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) return res.status(404).send({ message: `Cannot delete User with id=${id}. Maybe User was not found!` });
            else return res.send({ message: "User was deleted successfully!" });
        })
        .catch(err => res.status(500).send({ message: "Error deleting User with id=" + id }));
};