var fs = require('fs'),
    generate = require('./lib/generate.js');

generate.css('config.json', function(error, data, file) {
  if(error) {
    console.log(error);
    return;
  }
  
  var values, out = '';
  data.forEach(function(selector) {
    for(key in selector) {
      values = JSON.stringify(selector[key]).replace(/'?"/g, '').replace(/,/g, ';\n');
      
      out += [
        key,
        values,
        '\n'
      ].join('\n');
      
    }
  });
  
  if(!file) {
    console.log(out);
    return;
  }
  
  fs.writeFile(file, out, function(error) {
    if(error) throw error;
    
    console.log('path: ' + file);
    console.log('size: ' + out.length + ' bytes');
  });
});