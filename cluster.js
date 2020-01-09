
var cluster = require('cluster');
var amount = 1;
global.name;
global.amount;
//global.rn;
function wait(milleseconds) {
  return new Promise(resolve => setTimeout(resolve, milleseconds))
}
// correct(); returns boolean; did bot get the answer right?
// answerQuestion(1-4); answers a question;

if (cluster.isMaster) {
  console.log("name: " + global.name);
  console.log("amount: " + global.amount);
var worker;
  //let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function lol () {
    for (var i = 0; i < amount; i += 1) {
      cluster.setupMaster({ exec: __dirname + '/bot.js',});
      worker = cluster.fork();
      await wait(500);
      worker.send(global.name);
      //worker.send(global.rn);
      //lol sleep();
    }
  }
  lol();
  worker.on('message', function(msg2) {
    var data = JSON.parse(msg2);
    var answer = data['answer'];
    worker.send(answer);
    console.log("Master recieved message " + data['answer']);
  });
    cluster.on('exit', function () {
        cluster.fork();
        //console.log("name2: " + global.name);
    });

} else {
    require('./bot');
    //console.log("name3: " + global.name);
}



