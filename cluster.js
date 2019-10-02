
var cluster = require('cluster');
var amount = global.amount;
global.name;
global.amount;
//global.rn;

if (cluster.isMaster) {
  console.log("name: " + global.name);
  console.log("amount: " + global.amount);

    for (var i = 0; i < amount; i += 1) {
      cluster.setupMaster({ exec: __dirname + '/bot.js',});
      var worker = cluster.fork();
      worker.send(global.name);
      //worker.send(global.rn);
    }

    cluster.on('exit', function () {
        cluster.fork();
        //console.log("name2: " + global.name);
    });

} else {
    require('./bot');
    //console.log("name3: " + global.name);
}



