var tools = require('./tools.js');

exports.css = function(file, path, callback) {
  tools.load(file, function(error, data) {
    var selectors = tools.parse(data);

    var values, out = '';
    selectors.forEach(function(selector) {
      for(key in selector) {
        values = JSON.stringify(selector[key]).replace(/'?"/g, '').replace(/,/g, ';\n');
        
        if(key[0] === '@')
          values = values.replace(/:/, ' ');
        
        out += [key, values, '\n'].join('\n');
      }
    });

    if(!out) {
      callback('error: could not generate css', null, null);
      return;
    }

    if(path) {
      tools.save(path, out, function(error, data) {
        if(error || data === null)
          callback(error, null, null);
        else
          callback(null, out, data);
      });
    } else
      callback(null, out, null);
  });
};

exports.js = function(file, callback) {
  tools.load(file, function(error, data) {
    var selectors = tools.parse(data);
    callback(null, selectors, null);
  });
};