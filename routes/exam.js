var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var Model = require("../models/exam");

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
  if (token) {
    var newModel = new Model({
      date: req.body.date,
      status: 'NEW',
      score: null,
      student: req.body.student,
      supervisor: req.body.supervisor,
      examRoom: req.body.examRoom,
    });
    newModel.save(function(err, result) {
      if (err) {
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
    Model.findById(req.param.id).remove(function (err, result) {
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
