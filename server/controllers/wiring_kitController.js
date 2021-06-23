const path = require("path");

const { WiringKit } = require("../database/models/models");
const ApiError = require("../error/ApiError");

class Wiring_KitController {
  async create(req, res, next) {
    try {
      const {
        brandWK,
        country,
        vendor_code,
        pin,
        price,
        rating,
        brandId,
        modelId,
        generationId,
        bodyStyleId,
        wiringKitInfoId,
      } = req.body;

      const { img } = req.files;
      let imgName = `wiringkit${brandWK}${vendor_code}` + ".jpg";
      img.mv(path.resolve(__dirname, "..", "database/static/images", imgName));

      const { doc } = req.files;
      let docName = `wiringkit${brandWK}${vendor_code}` + ".pdf";
      doc.mv(
        path.resolve(__dirname, "..", "database/static/documents", docName)
      );

      const wiring_kit = await WiringKit.create({
        brandWK,
        country,
        vendor_code,
        pin,
        price,
        rating,
        brandId,
        modelId,
        generationId,
        bodyStyleId,
        wiringKitInfoId,
        img: imgName,
        doc: docName,
      });

      return res.json(wiring_kit);
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
    let wiring_kits;
    if (!brandId && !modelId && !generationId && !bodyStyleId) {
      wiring_kits = await WiringKit.findAndCountAll({ limit, offset });
    }
    if (brandId && !modelId && !generationId && !bodyStyleId) {
      wiring_kits = await WiringKit.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (brandId && modelId && !generationId && !bodyStyleId) {
      wiring_kits = await WiringKit.findAndCountAll({
        where: { brandId, modelId },
        limit,
        offset,
      });
    }
    if (brandId && modelId && generationId && !bodyStyleId) {
      wiring_kits = await WiringKit.findAndCountAll({
        where: { brandId, modelId, generationId },
        limit,
        offset,
      });
    }
    if (brandId && modelId && generationId && bodyStyleId) {
      wiring_kits = await WiringKit.findAndCountAll({
        where: { brandId, modelId, generationId, bodyStyleId },
        limit,
        offset,
      });

    }
    return res.json(wiring_kits);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const wiring_kit = await WiringKit.findOne({
      where: { id },
    });
    return res.json(wiring_kit);
  }
}

module.exports = new Wiring_KitController();
