const mongoose = require("mongoose");

const HoChiMinh = mongoose.model(
  "HoChiMinh",
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
  "HoChiMinh"
);

module.exports = HoChiMinh;
