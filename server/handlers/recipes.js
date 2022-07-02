const fs = require('fs');
const path = require('path');
const { models } = require('../../storage/definers');
const { getIdParam, getUserIdParam } = require('../helpers');

async function getAllForHome(req, res) {
    try {
        const response = await models.recipe.findAll();
        res.json(response);
      } catch (error) {
        console.log(error.message);
      }
};

async function getAll(req, res) {
    const userId = getUserIdParam(req)
    const recipes = await models.recipe.findAll({
        where: {
            user_id: userId
        }
    });
    res.status(200).json(recipes);
};

async function getById(req, res) {
    const userId = getUserIdParam(req)
    const recipe = await models.recipe.findOne({
        where: {
            id: req.params.id,
            user_id: userId
        }
    });
    if (recipe) {
        res.status(200).json(recipe);
    } else {
        res.status(404).send('404 - Not found');
    }
};

async function create (req, res) {
    if (req.files === undefined)
    return res.status(400).json({ msg: "No File Uploaded" });
    const userId = getUserIdParam(req)
    const name = req.body.name;
    const description = req.body.description;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Image" });
    if (fileSize > 2000000)
        return res.status(422).json({ msg: "Image must be less than 2MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
        await models.recipe.create({
            name: name,
            description: description,
            image: fileName,
            url: url,
            user_id: userId,
        });
        res.status(201).json({ msg: "Recipe created Successfully" });
        } catch (error) {
        console.log(error.message);
        }
    });
    
};

async function update(req, res) {
    const userId = getUserIdParam(req)
    const recipe = await models.recipe.findOne({
        where: {
          id: req.params.id,
          user_id:userId,
        },
      });
      if (!recipe) return res.status(404).json({ msg: "data not found" });
      let fileName = "";
      if (req.files === null) {
        fileName = models.recipe.image;
      } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = [".png", ".jpg", ".jpeg"];
    
        if (!allowedType.includes(ext.toLowerCase()))
          return res.status(422).json({ msg: "Invalid Image" });
        if (fileSize > 2000000)
          return res.status(422).json({ msg: "Image must be less than 2MB" });
    
        const filepath = `./public/images/${recipe.image}`;
        fs.unlinkSync(filepath);
    
        file.mv(`./public/images/${fileName}`, (err) => {
          if (err) return res.status(500).json({ msg: err.message });
        });
      }
      const name = req.body.name;
    const description = req.body.description;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
      try {
        await models.recipe.update(
          {
            name: name,
            description: description,
            image: fileName,
            url: url,
          },
          {
            where: {
              id: req.params.id,
              user_id:userId,
            },
          }
        );
        res.status(200).json({ msg: "Recipe updated successfully" });
      } catch (error) {
        console.log(error.message);
      }
};

async function remove(req, res) {
    const userId = getUserIdParam(req)
    const recipe = await models.recipe.findOne({
        where: {
          id: req.params.id,
          user_id: userId,
        },
      });
      if (!recipe) return res.status(404).json({ msg: "Data not found" });
      try {
        const filepath = `./public/images/${recipe.image}`;
        fs.unlinkSync(filepath);
        await models.recipe.destroy({
          where: {
            id: req.params.id,
            user_id: userId,
          },
        });
        res.status(200).json({ msg: "Recipe deleted successfully" });
      } catch (error) {
        console.log(error.message);
      }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};