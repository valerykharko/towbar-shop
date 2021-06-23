const { AccessoriesInfo } = require("../database/models/models");

class AccessoriesInfoController {
  async create(req, res) {
    const { description } = req.body;
    const farkopInfo = await AccessoriesInfo.create({ description });
    return res.json(farkopInfo);
  }

  async getAll(req, res) {
    const farkopInfo = await AccessoriesInfo.findAll();
    return res.json(farkopInfo);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const farkopInfo = await AccessoriesInfo.findOne({
      where: { id },
    });
    return res.json(farkopInfo);
  }
}

module.exports = new AccessoriesInfoController();
