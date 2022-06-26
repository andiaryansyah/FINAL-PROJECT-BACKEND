const { models } = require('../../storage/definers');
const bcrypt = require("bcrypt");
const { getIdParam } = require('../helpers');

async function getAllUsers(req, res) {
    const users = await models.user.findAll({
        attributes: ['id', 'name','email']
    });
    res.status(200).json(users);
};

async function getByIdUser(req, res) {
    const id = getIdParam(req);
    const users = await models.user.findOne({
        attributes: ['id', 'name','email'],
        where: {
            id: id
        }
    });
    if (users) {
        res.status(200).json(users);
    } else {
        res.status(404).send('404 - Not found');
    }
};

async function register(req, res) {
    const { name, email,password, phone_number  } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    if (req.body.id) {
        res.status(400).json({ error: "id should not be provided, since it is determined automatically by the database" })
    } else {
        await models.user.create({
            name: name,
            password: hashedPassword,
            email: email,
            phone_number: phone_number
        });
        res.status(201).json({
            success: true
        });
    }
};


async function deleteUser(req, res) {
    const user = await models.user.destroy({
        where: {
            id:req.params.id
        }
    });
    if (user) {
        res.status(200).json({ status: 'success' })
    } else {
        res.status(404).send('404 - Not found');
    }
};

module.exports = {
    getAllUsers,
    getByIdUser,
    register,
    deleteUser,
};