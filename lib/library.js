class library {
  getHostName(req) {
    var fullUrl = req.protocol + '://' + req.get('host');
    return fullUrl;
  }

  removeDot(number) {
    var newNumber = parseInt(number.split('.').join(""));
    return newNumber;
  }
}

module.exports = new library;