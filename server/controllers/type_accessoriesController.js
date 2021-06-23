const { TypeAccessories } = require("../database/models/models");

class TypeAccessoriesController {
  async create(req, res) {
    const { name } = req.body;
    const type_accessory = await TypeAccessories.create({ name });
    return res.json(type_accessory);
  }

  async getAll(req, res) {
    const type_accessories = await TypeAccessories.findAll();
    return res.json(type_accessories);
  }
}

module.exports = new TypeAccessoriesController();
