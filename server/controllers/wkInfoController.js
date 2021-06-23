const { WiringKitInfo } = require("../database/models/models");

class WKInfoController {
  async create(req, res) {
    const { description } = req.body;
    const wkInfo = await WiringKitInfo.create({ description });
    return res.json(wkInfo);
  }

  async getAll(req, res) {
    const wkInfo = await WiringKitInfo.findAll();
    return res.json(wkInfo);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const wkInfo = await WiringKitInfo.findOne({
      where: { id },
    });
    return res.json(wkInfo);
  }
}

module.exports = new WKInfoController();
