var griderator = require('../generate.js');

griderator.css('test/test-config.json', function(error, data, path) {
  if(error) throw error;
  
  console.log(data);
});