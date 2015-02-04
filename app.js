var generate = require('./lib/generate.js');

generate.get('config.json', function(error, data) {
  if(error) {
    console.log(error);
    return;
  }
  
  console.log('css selector object:');
  console.log(data);
  console.log();
  
  console.log('css code:');
  
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
  
  console.log(out);
});