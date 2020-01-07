
var cluster = require('cluster');
var amount = global.amount;
global.name;
global.amount;
//global.rn;
function wait(milleseconds) {
  return new Promise(resolve => setTimeout(resolve, milleseconds))
}
function sendBots() {
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
  var workersded = false;
  timeout = setTimeout(() => {
    if (cluster.isWorker) {
      worker.kill();
      if (workersded == false) {
        console.log('killing workers.');
        workersded = true;
      } else {
      }
    }
    }, 20000);
  function interval() {
    return setInterval(sendLength, 3000);
  }
  function sendLength() {
    var amount = cluster.workers.length;
    global.bots = amount;
  }
  interval();

    cluster.on('exit', function () {
        //cluster.fork();
        console.log("cluster exit ");
    });

} else {
    require('./bot');
    //console.log("name3: " + global.name);
}
}



