const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketItems = sequelize.define("basket_items", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Farkop = sequelize.define("farkop", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  brandF: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
  vendor_code: { type: DataTypes.STRING, allowNull: false },
  max_hor: { type: DataTypes.INTEGER, allowNull: false },
  max_ver: { type: DataTypes.INTEGER, allowNull: false },
  cutout: { type: DataTypes.STRING, allowNull: false },
  ball_type: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: true },
  doc: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const FarkopInfo = sequelize.define("farkop_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false },
});

const WiringKit = sequelize.define("wiring_kit", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  brandWK: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
  vendor_code: { type: DataTypes.STRING, allowNull: false },
  pin: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: true },
  doc: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.INTEGER, allowNull: true },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const WiringKitInfo = sequelize.define("wiring_kit_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false },
});

const Accessories = sequelize.define("accessories", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
  vendor_code: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: true },
  doc: { type: DataTypes.STRING, allowNull: true },
  price: { type: DataTypes.INTEGER, allowNull: true },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const TypeAccessories = sequelize.define("type_accessories", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const AccessoriesInfo = sequelize.define("accessories_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Model = sequelize.define("model", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Generation = sequelize.define("generation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  year_of_issue: { type: DataTypes.STRING, allowNull: false },
  smart: { type: DataTypes.STRING, allowNull: false },
});

const BodyStyle = sequelize.define("body_style", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const GenerationBodyStyle = sequelize.define("generation_body_style", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Farkop.hasMany(Rating);
Rating.belongsTo(Farkop);

WiringKit.hasMany(Rating);
Rating.belongsTo(WiringKit);

Accessories.hasMany(Rating);
Rating.belongsTo(Accessories);

Basket.hasMany(BasketItems);
BasketItems.belongsTo(Basket);

Farkop.hasOne(BasketItems);
BasketItems.belongsTo(Farkop);

WiringKit.hasOne(BasketItems);
BasketItems.belongsTo(WiringKit);

Accessories.hasOne(BasketItems);
BasketItems.belongsTo(Accessories);

Generation.belongsToMany(BodyStyle, { through: GenerationBodyStyle });
BodyStyle.belongsTo(Generation, { through: GenerationBodyStyle });

FarkopInfo.hasMany(Farkop);
Farkop.belongsTo(FarkopInfo);

WiringKitInfo.hasMany(WiringKit);
WiringKit.belongsTo(WiringKitInfo);

AccessoriesInfo.hasMany(Accessories);
Accessories.belongsTo(AccessoriesInfo);

TypeAccessories.hasMany(Accessories);
Accessories.belongsTo(TypeAccessories);

Brand.hasMany(Farkop);
Farkop.belongsTo(Brand);

Model.hasMany(Farkop);
Farkop.belongsTo(Model);

Generation.hasMany(Farkop);
Farkop.belongsTo(Generation);

BodyStyle.hasMany(Farkop);
Farkop.belongsTo(BodyStyle);

Brand.hasMany(WiringKit);
WiringKit.belongsTo(Brand);

Model.hasMany(WiringKit);
WiringKit.belongsTo(Model);

Generation.hasMany(WiringKit);
WiringKit.belongsTo(Generation);

BodyStyle.hasMany(WiringKit);
WiringKit.belongsTo(BodyStyle);

Brand.hasMany(Model);
Model.belongsTo(Brand);

Model.hasMany(Generation);
Generation.belongsTo(Model);

module.exports = {
  User,
  Basket,
  BasketItems,
  Farkop,
  FarkopInfo,
  WiringKit,
  WiringKitInfo,
  Brand,
  Model,
  Generation,
  BodyStyle,
  Accessories,
  TypeAccessories,
  AccessoriesInfo,
  Rating,
};
