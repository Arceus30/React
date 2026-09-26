const express = require("express");
const users = [
    {
        id: 1,
        name: "Alice",
        role: "admin",
    },
    {
        id: 2,
        name: "Bob",
        role: "user",
    },
    {
        id: 3,
        name: "Charlie",
        role: "user",
    },
];

const router = express.Router();

router
    .route("/")
    .get((req, res) => {
        // express gives us header names in lowercase
        console.log(req.headers["x-client"]);
        console.log(req.headers["x-version"]);
        const { role, limit } = req.query;
        let result = users;
        if (role) {
            result = result.filter((user) => user.role === role);
        }
        if (limit) {
            result = result.slice(0, limit);
        }
        res.json(result);
    })
    .post((req, res) => {
        const user = {
            id: users.length + 1,
            ...req.body,
        };
        users.push(user);
        res.status(201).json(user);
    });

router
    .route("/:id")
    .put((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        users[userIndex] = {
            id,
            ...req.body,
        };
        res.json(users[userIndex]);
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        Object.assign(user, req.body);
        res.json(user);
    })
    .delete((req, res) => {
        const id = Number(req.params.id);
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const deletedUser = users.splice(userIndex, 1)[0];
        res.json({
            message: "User deleted",
            user: deletedUser,
        });
    });

module.exports = router;
