var fs = require('fs');

function parse(object) {
  var width = parseInt(object.width);
  var name, selector, selectors = [];
  
  selectors.push({
    "*": {
      "margin": 0,
      "padding": 0,
      "position": "relative",
      "-webkit-box-sizing": "border-box",
      "-moz-box-sizing": "border-box",
      "box-sizing": "border-box"
    }
  });
  
  name = '[' + object.attribute + ']';
  selector = {};
  selector[name] = {
    "width": object.width,
    "display": "inline-block",
    "*display": "inline",
    "*zoom": 1,
    "vertical-align": "top",
    "overflow": "hidden",
    "*overflow": "visible"
  };
  selectors.push(selector);
  
  for(var i = 1; i <= object.columns; i++) {
    for(var j = i; j <= object.columns; j++) {
      if(i == j) continue;
      if(i > 1 && !(j % i)) continue;
      
      name = object.selectors.container + ' ';
      name += object.selectors.element + '[';
      name += object.attribute;
      name += '~="' + i + '/' + j + '"]';
      
      selector = {};
      selector[name] = {
        "width": ((i / j) * width) + (object.width.split(/(\d+)(?!.*\d)/).pop()),
      };
      
      selectors.push(selector);
    }
  }
  
  return selectors;
};

exports.get = function(file, callback) {
  fs.readFile(file, 'utf8', function(error, data) {
    if(error || data === null) {
      callback(error || 'error: data is null', null);
      return;
    }
    
    data = JSON.parse(data);
    var css = parse(data);
    
    callback(null, css, data.file);
  });
};