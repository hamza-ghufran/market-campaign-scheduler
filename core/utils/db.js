
module.exports.insert = function (dataBase, doc, cb) {
  var db = nano.use(dataBase);

  db.insert(doc, function (err, body) {
    if (!err) {
      return cb(null, body);
    } else {
      console.log('Error occured while inserting doc ', err);
      return cb(err, null);
    }
  });
};