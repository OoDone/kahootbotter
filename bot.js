var Kahoot = require('kahoot.js-updated');
var client = new Kahoot;
var cluster = require('cluster');
function wait(milleseconds) {
  return new Promise(resolve => setTimeout(resolve, milleseconds))
}
if (cluster.isMaster) {
  console.log('I am master');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log('I am worker #' + cluster.worker.id);
}
process.on('message', function(msg) {
  console.log("msg: " + msg);
  var game_pin = msg;
  console.log("Joining kahoot...  ");
  client.join(game_pin, 'Mike Hawk ' + cluster.worker.id);
  //client.join(game_pin, randomName);
});
client.on("Joined", () => {
    console.log("I joined the Kahoot!");
});
client.on("QuestionStart", async question => {
    console.log("A new question has started, answering the first answer.");
    //var answer = question.correctAnswer(1)
    await wait(cluster.worker.id * 15);
    client.answer(Math.floor(Math.random() * 4));
});
client.on("Disconnect", () => {
    console.log("The quiz has ended. - bot" + cluster.worker.id);
});
 