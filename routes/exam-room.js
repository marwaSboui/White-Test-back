var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
var Model = require("../models/exam-room");

router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Model.find(function (err, result) {
      if (err) return next(err);
      res.json(result);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});


router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  console.log(req.body);
  if (token) {
    var newModel = new Model({
      number: req.body.number,
      availability: req.body.availability,
    });
    newModel.save(function(err, result) {
      if (err) {
        console.log(err);
        return res.json({success: false, msg: 'cant create certification'});
      }
      return res.json(result);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Model.findByIdAndUpdate(req.param.id, req.body, function (err, result) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      return res.json(result);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Model.findById(req.param.id, function (err, result) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      return res.json(result);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});


router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Model.findById(req.params.id).remove(function (err, result) {
      return res.status(201).send();
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}
module.exports = router;
