var express = require('express');
var router = express.Router();

var goldPriceModel = require('../model/goldprice.js');
var userModel = require('../model/userModel.js');
var library = require('../lib/library.js');

var baoHungTitle = ' | Tiệm vàng Bảo Hưng';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/bang-gia-khach', function(req, res, next) {
  goldPriceModel.findOne({}).sort({_id:-1}).then(function(data) {
    res.render('goldTablePrice', {
      title: 'Bảng giá khách' + baoHungTitle,
      myDomain: library.getHostName(req),
      goldPrice: data
    });
  });
});

router.get('/quan-ly', function(req, res, next) {
  if (!req.session.username) {
    return res.redirect('/dang-nhap');
  }

  goldPriceModel.findOne({}).sort({_id:-1}).then(function(data) {
    res.render('admin/index', {
      title: 'Quản lý giá vàng' + baoHungTitle,
      myDomain: library.getHostName(req),
      breadCrumb_1: 'Quan ly gia vang',
      breadCrumb_2: 'Gia vang hom nay',
      goldPrice: data
    });
  });
});

router.get('/quan-ly/cap-nhat', function(req, res, next) {
  if (!req.session.username) {
    return res.redirect('/dang-nhap');
  }
  goldPriceModel.findOne({}).sort({_id:-1}).then(function(data) {
    res.render('admin/update', {
      title: 'Cập nhật giá vàng' + baoHungTitle,
      myDomain: library.getHostName(req),
      breadCrumb_1: 'Quan ly gia vang',
      breadCrumb_2: 'Cap nhat gia vang',
      goldPrice: data
    });
  });
});

router.post('/quan-ly/cap-nhat', function(req, res, next) {
  var item = {
    buy9999: library.removeDot(req.body.buy9999),
    sell9999: library.removeDot(req.body.sell9999),
    buy95_5: library.removeDot(req.body.buy95_5),
    sell95_5: library.removeDot(req.body.sell95_5),
    buy95: library.removeDot(req.body.buy95),
    sell95: library.removeDot(req.body.sell95),
    buy68: library.removeDot(req.body.buy68),
    sell68: library.removeDot(req.body.sell68),
    buy61: library.removeDot(req.body.buy61),
    sell61: library.removeDot(req.body.sell61),
    buy41_6: library.removeDot(req.body.buy41_6),
    sell41_6: library.removeDot(req.body.sell41_6),
    buy75_g: library.removeDot(req.body.buy75_g),
    sell75_g: library.removeDot(req.body.sell75_g)
  };

  var dataInsert = new goldPriceModel(item);
  dataInsert.save();

  res.send('Update Successful!');
});

router.get('/dang-nhap', function(req, res, next) {
  if (req.session.username) {
    return res.redirect('/quan-ly');
  }

  res.render('login', {
    title: 'Đăng nhập' + baoHungTitle,
    alert: false
  });
});

router.get('/dang-xuat', function(req, res, next) {
  req.session.destroy();
  res.redirect('/dang-nhap');
});

router.post('/dang-nhap', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  userModel.findOne({
    username: username,
    password: password
  }).then(function(data) {
    if (data) {
      req.session.username = data.username;
      res.redirect('/quan-ly');
    } else {
      res.render('login', {
        title: 'Đăng nhập',
        alert: true
      });
    }
  });
});

module.exports = router;