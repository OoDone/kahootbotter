
var cluster = require('cluster');
var amount = global.amount;
global.name;
global.amount;
//global.rn;
function wait(milleseconds) {
  return new Promise(resolve => setTimeout(resolve, milleseconds))
}

if (cluster.isMaster) {
  console.log("name: " + global.name);
  console.log("amount: " + global.amount);

  //let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function lol () {
    for (var i = 0; i < amount; i += 1) {
      cluster.setupMaster({ exec: __dirname + '/bot.js',});
      var worker = cluster.fork();
      await wait(500);
      worker.send(global.name);
      //worker.send(global.rn);
      //lol sleep();
    }
  }
  lol();

    cluster.on('exit', function () {
        cluster.fork();
        //console.log("name2: " + global.name);
    });

} else {
    require('./bot');
    //console.log("name3: " + global.name);
}



