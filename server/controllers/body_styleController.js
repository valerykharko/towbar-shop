const ApiError = require("../error/ApiError");
const { BodyStyle } = require("../database/models/models");

class BodyStyleController {
  async create(req, res, next) {
    try {
      const { name, generationId } = req.body;
      const body_style = await BodyStyle.create({ name, generationId });
      return res.json(body_style);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { generationId } = req.query;
    let body_styles;
    if (!generationId) {
      body_styles = await BodyStyle.findAll();
    }
    if (generationId) {
      body_styles = await BodyStyle.findAll({ where: { generationId } });
    }

    return res.json(body_styles);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const body_style = await BodyStyle.findOne({
      where: { id },
    });
    return res.json(body_style);
  }
}

module.exports = new BodyStyleController();
