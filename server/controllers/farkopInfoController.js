const { FarkopInfo } = require("../database/models/models");

class FarkopInfoController {
  async create(req, res) {
    const { description } = req.body;
    const farkopInfo = await FarkopInfo.create({ description });
    return res.json(farkopInfo);
  }

  async getAll(req, res) {
    const farkopInfo = await FarkopInfo.findAll();
    return res.json(farkopInfo);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const farkopInfo = await FarkopInfo.findOne({
      where: { id },
    });
    return res.json(farkopInfo);
  }
}

module.exports = new FarkopInfoController();
