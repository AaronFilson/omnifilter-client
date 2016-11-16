const express = require('express');
var myPort = process.env.PORT || process.env.$PORT || 5000;
express().use(express.static(__dirname + '/build'))
  .listen(myPort, () => console.log('Client server up on port ' + myPort + '.'));
