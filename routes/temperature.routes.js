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

  //add new data for temp
  app.post(
    "/api/addTempData/:PVName",
    [authJwt.verifyToken, authJwt.isModerator],
    async (req, res, next) => {
      try {
        let data = req.body;
        console.log(data.YEAR);
        //check if data exist for that year
        let queryData = await db[`${req.params.PVName}`].find({
          YEAR: data.YEAR,
          PARAMETER: "T2M",
        });
        //not exist then create new one
        console.log(queryData);
        if (queryData[0] == undefined) {
          const newData = new db[req.params.PVName]({
            ...data,
            PARAMETER: "T2M",
          });
          const saveData = await newData.save();
          console.log(saveData);
          res.status(200).json({ msg: "Data add successfully" });
        } else {
          console.log("Data already existed");
          res.status(400).json({ msg: "Data already added" });
        }
      } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
      }
    }
  );
  //add new data for rain amount
  app.post(
    "/api/addRainData/:PVName",
    [authJwt.verifyToken, authJwt.isModerator],
    async (req, res, next) => {
      try {
        let data = req.body;
        console.log(data.YEAR);
        //check if data exist for that year
        let queryData = await db[`${req.params.PVName}`].find({
          YEAR: data.YEAR,
          PARAMETER: "RH2M",
        });
        //not exist then create new one
        console.log(queryData);
        if (queryData[0] == undefined) {
          const newData = new db[req.params.PVName]({
            ...data,
            PARAMETER: "RH2M",
          });
          const saveData = await newData.save();
          console.log(saveData);
          res.status(200).json({ msg: "Data add successfully" });
        } else {
          console.log("Data already existed");
          res.status(400).json({ msg: "Data already added" });
        }
      } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
      }
    }
  );

  //Delete data of temp in a year
  app.delete(
    "/api/deleteTempData/:PVName/:year",
    [authJwt.verifyToken, authJwt.isModerator],
    async (req, res, next) => {
      try {
        const queryData = await db[`${req.params.PVName}`].find({
          YEAR: req.params.year,
          PARAMETER: "T2M",
        });
        //check if doc exist
        if (queryData[0] != undefined) {
          const deletingData = await db[`${req.params.PVName}`].deleteOne({
            YEAR: req.params.year,
            PARAMETER: "T2M",
          });
          console.log(deletingData);
          res.status(200).json({ msg: "delete successfully" });
        } else {
          res.status(400).json({ msg: "data not exist" });
        }
      } catch (error) {
        res.status(500).json({ msg: "something went wrong" });
      }
    }
  );
  //Delete data of rain amount in a year
  app.delete(
    "/api/deleteRainData/:PVName/:year",
    [authJwt.verifyToken, authJwt.isModerator],
    async (req, res, next) => {
      try {
        const queryData = await db[`${req.params.PVName}`].find({
          YEAR: req.params.year,
          PARAMETER: "RH2M",
        });
        //check if doc exist
        if (queryData[0] != undefined) {
          const deletingData = await db[`${req.params.PVName}`].deleteOne({
            YEAR: req.params.year,
            PARAMETER: "RH2M",
          });
          console.log(deletingData);
          res.status(200).json({ msg: "delete successfully" });
        } else {
          res.status(400).json({ msg: "data not exist" });
        }
      } catch (error) {
        res.status(500).json({ msg: "something went wrong" });
      }
    }
  );

  //update rain data in a year
  app.post(
    "/api/updateRainData/:PVName",
    [authJwt.verifyToken, authJwt.isModerator],
    async (req, res, next) => {
      let updateData = req.body;
      console.log(updateData);
      try {
        //query 1st to check if exist
        const queryData = await db[`${req.params.PVName}`].find({
          YEAR: updateData.YEAR,
          PARAMETER: "RH2M",
        });
        //data exist
        if (queryData[0] != undefined) {
          const updatingData = await db[`${req.params.PVName}`].updateOne(
            {
              YEAR: updateData.YEAR,
              PARAMETER: "RH2M",
            },
            updateData
          );
          console.log(updatingData);
          res.status(200).json({ msg: "update successfully" });
        } else {
          res.status(400).json({ msg: "data not exist" });
        }
      } catch (error) {}
    }
  );

  //update temp data in a year
  app.post(
    "/api/updateTempData/:PVName",
    [authJwt.verifyToken, authJwt.isModerator],
    async (req, res, next) => {
      let updateData = req.body;
      console.log(updateData);
      try {
        //query 1st to check if exist
        const queryData = await db[`${req.params.PVName}`].find({
          YEAR: updateData.YEAR,
          PARAMETER: "T2M",
        });
        //data exist
        if (queryData[0] != undefined) {
          const updatingData = await db[`${req.params.PVName}`].updateOne(
            {
              YEAR: updateData.YEAR,
              PARAMETER: "T2M",
            },
            updateData
          );
          console.log(updatingData);
          res.status(200).json({ msg: "update successfully" });
        } else {
          res.status(400).json({ msg: "data not exist" });
        }
      } catch (error) {}
    }
  );
};
