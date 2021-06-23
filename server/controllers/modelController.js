const ApiError = require("../error/ApiError");

const { Model } = require("../database/models/models");

class ModelController {
  async create(req, res, next) {
    try {
      const { name, brandId } = req.body;
      const model = await Model.create({ name, brandId });
      return res.json(model);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId } = req.query;
    let models;
    if (!brandId) {
      models = await Model.findAll();
    }
    if (brandId) {
      models = await Model.findAll({ where: { brandId } });
    }

    return res.json(models);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const model = await Model.findOne({
      where: { id },
    });
    return res.json(model);
  }
}

module.exports = new ModelController();
