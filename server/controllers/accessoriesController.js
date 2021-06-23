const path = require("path");

const { Accessories, AccessoriesInfo } = require("../database/models/models");
const ApiError = require("../error/ApiError");

class AccessoriesController {
  async create(req, res, next) {
    try {
      let {
        name,
        brand,
        country,
        vendor_code,
        price,
        rating,
        accessoriesInfoId,
        typeAccessoryId,
      } = req.body;

      const { img } = req.files;
      let imgName = `accessory${brand}${vendor_code}` + ".jpg";
      img.mv(path.resolve(__dirname, "..", "database/static/images", imgName));

      const { doc } = req.files;
      let docName = `accessory${brand}${vendor_code}` + ".pdf";
      doc.mv(
        path.resolve(__dirname, "..", "database/static/documents", docName)
      );

      const accessory = await Accessories.create({
        name,
        brand,
        country,
        vendor_code,
        price,
        rating,
        accessoriesInfoId,
        typeAccessoryId,
        img: imgName,
        doc: docName,
      });
      return res.json(accessory);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { typeAccessoryId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    let accessories;
    if (!typeAccessoryId) {
      accessories = await Accessories.findAndCountAll({ limit, offset });
    } else {
      accessories = await Accessories.findAndCountAll({
        where: { typeAccessoryId },
        limit,
        offset,
      });
    }
    return res.json(accessories);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const accessory = await Accessories.findOne({
      where: { id },
    });
    return res.json(accessory);
  }
}

module.exports = new AccessoriesController();
