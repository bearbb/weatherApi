const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const db = require("../models");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/tempNRainDataByNameAndYear/:PVName/:year",
    [authJwt.verifyToken],
    async (req, res, next) => {
      try {
        const data = await db[`${req.params.PVName}`].find({
          YEAR: req.params.year,
        });
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json({ msg: "something went wrong" });
        next(error);
      }
    }
  );
  app.get(
    "/api/tempNRainPrecise/:PVName/:year/:month",
    [authJwt.verifyToken],
    async (req, res, next) => {
      try {
        const data = await db[`${req.params.PVName}`].find({
          YEAR: req.params.year,
        });
        let tempData = data.filter((d) => d.PARAMETER == "T2M")[0];
        let rainData = data.filter((d) => d.PARAMETER == "RH2M")[0];
        console.log(tempData);
        const dataFinal = {
          temp: tempData[`${req.params.month}`],
          rainAmount: rainData[`${req.params.month}`],
        };
        res.status(200).json({ dataFinal });
      } catch (error) {
        console.error(error);
      }
    }
  );
};
