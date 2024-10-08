const express = require('express');
const usersFileBL = require('../BLL/usersFileBL');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();


//http://localhost:4824/usersfile
router.route('/')
    .get(verifyToken, async (req, resp) => {
        const users = await usersFileBL.getAllUsers();
        return resp.json(users);
    })
    .post(verifyToken, async (req, resp) => {
        const newUser = req.body;
        await usersFileBL.addUser(newUser);
        return resp.status(201).json(newUser);
    });

//http://localhost:4824/usersfile/1
router.route('/:id')
    .get(verifyToken, async (req, resp) => {
        const id = req.params.id;
        const user = await usersFileBL.getUserById(id);
        return resp.json(user);
    })
    .put(verifyToken, async (req, resp) => {
        const id = req.params.id;
        const user = req.body;
        await usersFileBL.updateUser(id, user);
        return resp.json(user);
    })
    .delete(verifyToken, async (req, resp) => {
        const id = req.params.id;
        await usersFileBL.deleteUser(id);
        return resp.sendStatus(204);
    });

    router.put('/:id/:property', verifyToken, async (req, res) => {
        try {
            const { id, property } = req.params;
            const newValue = req.body.newValue;
            await usersFileBL.updateUserProperty(id, property, newValue);
            res.status(200).send({ message: 'User updated successfully' });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    });
module.exports = router;