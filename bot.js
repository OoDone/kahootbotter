var Kahoot = require('kahoot.js-updated');
var client = new Kahoot;
var NameGenerator = require('nodejs-randomnames');
var randomName = NameGenerator.getRandomName();
//const cluster = require('cluster');
var game_pin = 0;
var cluster = require('cluster');
var qstart;
var q;
var Searchers = require('./test.js');
var quest = global.quest;
var a;

if (cluster.isMaster) {
  console.log('I am master');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log('I am worker #' + cluster.worker.id);
}
var randomnumber = Math.round(Math.random() * 3);
process.on('message', function(msg) {
  if (msg < 5) {
    //if (qstart == true) {
      q.answer(msg);
    //}
  } else {
  console.log("msg: " + msg);
  game_pin = msg;
  console.log("Joining kahoot...  ");
  client.join(game_pin, 'bot' + cluster.worker.id);
  //client.join(game_pin, randomName);
  }

});
var answer;
client.on("joined", () => {
    console.log("I joined the Kahoot!");
    answer = cluster.worker.id - 1;
    
});
client.on("quiz", quiz => {
  console.log( "client.name: " + quiz.name);
  console.log( "client.type: " + quiz.type);
  console.log( "client.questionCount: " + quiz.questionCount);
  //console.log( "client.answerCounts: " + quiz.answerCounts);
  var xd = quiz.answerCounts[1];
  console.log(xd);
  //name, type, qcount, answercount
  Searchers.searchs(quiz.name, quiz.type, quiz.questioncount, quiz.answerCounts);
});
//console.log("A new question has started, answeringsadasdasdsa the first answer.");
client.on("questionStart", question => {
  console.log("XD" + question);
  var questionnum = question.number - 1;
  console.log(questionnum);
  var choice = quest[questionnum].choices;
  console.log("quest: " + choice);
  for (var i = 0; i < choice.length; i++) {
    var answer2 = choice[i].correct;
    if (answer2 == true) {
      a = answer2;
      console.log("answer: " + answer2);
    } else {
      a = answer2;
      console.log(" NOT answer: " + answer2);
    }
  }
});
client.on("questionEnd", question => {
  console.log("did i get it right? " + question.correct);
  var correct = question.correct;
  if (correct) {
    console.log("YES TRIGGERED");
    var data = '{"answer":"' + answer + '"}'
    process.send(data);
  } else {
    console.log("YES TRIGGERED but got answer wrong :(");
  }
});
client.on("quizEnd", () => {
    console.log("The quiz has ended. - bot" + cluster.worker.id);
});
