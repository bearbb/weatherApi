const mongoose = require("mongoose");
module.exports = function find(name, query, cb) {
  mongoose.connection.db.collection(name, function (err, collection) {
    collection.find(query).toArray(cb);
  });
};
