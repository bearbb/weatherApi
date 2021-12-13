const mongoose = require("mongoose");

const TayNinh = mongoose.model(
  "TayNinh",
  new mongoose.Schema({
    PARAMETER: String,
    YEAR: Number,
    JAN: Number,
    FEB: Number,
    MAR: Number,
    APR: Number,
    MAY: Number,
    JUN: Number,
    JUL: Number,
    AUG: Number,
    SEP: Number,
    OCT: Number,
    NOV: Number,
    DEC: Number,
    ANN: Number,
  }),
  "TayNinh"
);

module.exports = TayNinh;
