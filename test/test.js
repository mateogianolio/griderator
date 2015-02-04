var griderator = require('../generate.js');

griderator.css('test/test-config.json', 'test/grid.css', function(error, data, path) {
  if(error) throw error;
  
  console.log('griderator.css() test:');
  console.log(data);
  
  console.log('successfully wrote above (' + data.length + ' bytes) to ' + path);
  console.log();
});

griderator.js('test/test-config.json', function(error, data) {
  if(error) throw error;
  
  console.log('griderator.js() test');
  console.log(data);
  console.log();
});