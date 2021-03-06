var fs = require('fs');
var path = require('path');

var methodUtils = require(path.join(__dirname, '../../..', 'src/methods/utils.js'));

module.exports = function() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '..', 'generated.sas'), (err, data) => {
      if(err) {
        return reject(err);
      }

      var patt = /DATA[^1|0]=(\[.*\])/gm;
      var matches = patt.exec(data.toString());
      matches.shift();

      resolve(matches.map(val => {
        return methodUtils.unescapeValues(methodUtils.convertDates(JSON.parse(val)));
      }).reduce((prev, cur) => {
        return prev.concat(cur);
      }));
    });
  });
}
