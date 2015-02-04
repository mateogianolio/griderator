var fs = require('fs');

function parse(object) {
  var width = parseInt(object.width);
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
  
  name = object.selectors.container;
  selector = {};
  selector[name] = {
    "width": object.width,
    "margin": "0 auto"
  };
  selectors.push(selector);
  
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
      
      name = object.selectors.element + '[';
      name += object.attribute;
      name += '~="' + i + '/' + j + '"]';
      
      selector = {};
      selector[name] = {
        "width": ((i / j) * width) + (object.width.split(/(\d+)(?!.*\d)/).pop()),
      };
      
      selectors.push(selector);
    }
  }
  
  if(!object.output || object.output === 'css' || object.file) {
    var values, out = '';
    selectors.forEach(function(selector) {
      for(key in selector) {
        values = JSON.stringify(selector[key]).replace(/'?"/g, '').replace(/,/g, ';\n');

        out += [key, values, '\n'].join('\n');
      }
    });
    
    if(object.file) {
      fs.writeFile(object.file, out, function(error) {
        if(error) throw error;
        
        console.log('successfully wrote ' + out.length + ' bytes to ' +  object.file);
      });
    }
    
    return out;
  }
  
  return selectors;
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