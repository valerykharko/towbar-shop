const ApiError = require("../error/ApiError");

const { Generation } = require("../database/models/models");

class GenerationController {
  async create(req, res, next) {
    try {
      const { name, year_of_issue, smart, modelId } = req.body;
      const generation = await Generation.create({
        name,
        year_of_issue,
        smart,
        modelId,
      });
      return res.json(generation);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { modelId } = req.query;
    let generations;
    if (!modelId) {
      generations = await Generation.findAll();
    }
    if (modelId) {
      generations = await Generation.findAll({ where: { modelId } });
    }

    return res.json(generations);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const generation = await Generation.findOne({
      where: { id },
    });
    return res.json(generation);
  }
}

module.exports = new GenerationController();
