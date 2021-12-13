const mongoose = require("mongoose");

const BaRia = mongoose.model(
  "BaRia",
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
  "BaRia"
);

module.exports = BaRia;
