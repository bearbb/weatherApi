const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.BaRia = require("./BaRia.model");
db.BinhDuong = require("./BinhDuong.model");
db.BinhPhuoc = require("./BinhPhuoc.model");
db.DongNai = require("./DongNai.model");
db.HoChiMinh = require("./HoChiMinh.model");
db.TayNinh = require("./TayNinh.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
