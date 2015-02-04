var fs = require('fs');

exports.parse = function(config) {
  var width = parseInt(config.width);
  var name, selector, selectors = [];
  
  selectors.push({
    "html": {
      "font-size": "100%"
    }
  });
  
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
  
  name = config.selectors.container;
  selector = {};
  selector[name] = {
    "width": config.width,
    "margin": "0 auto"
  };
  selectors.push(selector);
  
  name = '[' + config.attribute + ']';
  selector = {};
  selector[name] = {
    "width": config.width,
    "padding-right": config.gutter,
    "display": "inline-block",
    "*display": "inline",
    "*zoom": 1,
    "vertical-align": "top",
    "overflow": "hidden",
    "*overflow": "visible"
  };
  selectors.push(selector);
  
  for(var i = 1; i <= config.columns; i++) {
    for(var j = i; j <= config.columns; j++) {
      if(i == j) continue;
      if(i > 1 && !(j % i)) continue;
      
      name = config.selectors.element + '[';
      name += config.attribute;
      name += '~="' + i + '/' + j + '"]';
      
      selector = {};
      selector[name] = {
        "width": ((i / j) * width) + (config.width.split(/(\d+)(?!.*\d)/).pop()),
      };
      
      selectors.push(selector);
    }
  }
  
  return selectors;
}

exports.load = function(file, callback) {
  fs.readFile(file, function(error, data) {
    if(error || data === null)
      callback(error, null);
    else
      callback(null, JSON.parse(data));
  });
}

exports.save = function(file, data, callback) {
  fs.writeFile(file, data, function(error) {
    if(error)
      callback(error, null);
    else
      callback(null, file);
  });
};