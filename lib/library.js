class library {
  getHostName(req) {
    var fullUrl = req.protocol + '://' + req.get('host');
    return fullUrl;
  }

  removeDot(number) {
    var newNumber = parseInt(number.split('.').join(""));
    return newNumber;
  }

  checkLogin(req, res) {
    if (!req.session.username) {
      return res.redirect('/dang-nhap');
    }
  }
}

module.exports = new library;