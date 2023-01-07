const kue = require('kue');
// ./node_modules/kue/bin/kue-dashboard  used to preview GUI in port3000

const Queue = kue.createQueue();


module.exports = Queue;