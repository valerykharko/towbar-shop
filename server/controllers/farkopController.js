const path = require("path");

const { Farkop } = require("../database/models/models");
const ApiError = require("../error/ApiError");

class FarkopController {
  async create(req, res, next) {
    try {
      const {
        brandF,
        country,
        vendor_code,
        max_hor,
        max_ver,
        cutout,
        ball_type,
        price,
        rating,
        farkopInfoId,
        brandId,
        modelId,
        generationId,
        bodyStyleId,
      } = req.body;

      const { img } = req.files;
      let imgName = `farkop${brandF}${vendor_code}` + ".jpg";
      img.mv(path.resolve(__dirname, "..", "database/static/images", imgName));

      const { doc } = req.files;
      let docName = `farkop${brandF}${vendor_code}` + ".pdf";
      doc.mv(
        path.resolve(__dirname, "..", "database/static/documents", docName)
      );

      const farkop = await Farkop.create({
        brandF,
        country,
        vendor_code,
        max_hor,
        max_ver,
        cutout,
        ball_type,
        price,
        rating,
        farkopInfoId,
        brandId,
        modelId,
        generationId,
        bodyStyleId,
        img: imgName,
        doc: docName,
      });

      return res.json(farkop);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let {
      brandId,
      modelId,
      generationId,
      bodyStyleId,
      limit,
      page,
    } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    let farkops;
    if (!brandId && !modelId && !generationId && !bodyStyleId) {
      farkops = await Farkop.findAndCountAll({ limit, offset });
    }
    if (brandId && !modelId && !generationId && !bodyStyleId) {
      farkops = await Farkop.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (brandId && modelId && !generationId && !bodyStyleId) {
      farkops = await Farkop.findAndCountAll({
        where: { brandId, modelId },
        limit,
        offset,
      });
    }
    if (brandId && modelId && generationId && !bodyStyleId) {
      farkops = await Farkop.findAndCountAll({
        where: { brandId, modelId, generationId },
        limit,
        offset,
      });
    }
    if (brandId && modelId && generationId && bodyStyleId) {
      farkops = await Farkop.findAndCountAll({
        where: { brandId, modelId, generationId, bodyStyleId },
        limit,
        offset,
      });
    }

    return res.json(farkops);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const farkop = await Farkop.findOne({
      where: { id },
    });
    return res.json(farkop);
  }
}

module.exports = new FarkopController();
