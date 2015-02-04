var fs = require('fs');

function parse(config) {
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
  
  if(!config.output || config.output === 'css' || config.file) {
    var css = generate(selectors);
    
    if(config.file) {
      fs.writeFile(config.file, css, function(error) {
        if(error) throw error;

        console.log('successfully wrote ' + css.length + ' bytes to ' +  config.file);
      });
    }
    
    return css;
  }
  
  return selectors;
}

function generate(selectors) {
  var values, out = '';
  selectors.forEach(function(selector) {
    for(key in selector) {
      values = JSON.stringify(selector[key]).replace(/'?"/g, '').replace(/,/g, ';\n');

      out += [key, values, '\n'].join('\n');
    }
  });

  return out; 
}

exports.css = function(file, callback) {
  fs.readFile(file, 'utf8', function(error, data) {
    if(error || data === null) {
      callback(error || 'error: data is null', null);
      return;
    }
    
    data = JSON.parse(data);
    var css = parse(data);
    
    if(!css)
      callback('error: could not generate css', null, null);
    else
      callback(null, css, data.file);
  });
};