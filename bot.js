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
global.quest;
global.bname;
//var quest = global.quest;
var a;

if (cluster.isMaster) {
  console.log('I am master');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log('I am worker #' + cluster.worker.id);
}
process.on('message', function(msg) {
var randomnumber = Math.round(Math.random() * 3);
  console.log("msg: " + msg);
  game_pin = msg;
  console.log("Joining kahoot...  ");
  //client.join(game_pin, 'bot' + cluster.worker.id);
  client.join(game_pin, global.bname);

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
  var questionnum = question.number - 1;
  console.log(questionnum);
  console.log("XDDD2:" + global.quest);
  console.log("XDDDD: " + JSON.parse(global.quest));//[questionnum].choices);
  var kasd = JSON.parse(global.quest);
  var c = kasd[questionnum].choices;
  console.log('c: ' + c);
  for (var i = 0; i < c.length; i++) {
    var answer2 = c[i].correct;
    if (answer2 == true) {
      a = answer2;
      var cnum = i;
      question.answer(cnum);
      console.log(cnum + " IS the answer!!!!!!!!");
      global.answer = cnum;
    } else {
      a = answer2;
      var cnumw = i;
      console.log(cnumw + " Is NOT the answer :( :( :( :(");
    }
  }
});
client.on("questionEnd", question => {
  console.log("did i get it right? " + question.correct);
  var correct = question.correct;
  if (correct) {
    console.log("YES TRIGGERED");
    var data = '{"answer":"' + answer + '"}'
    //process.send(data);
  } else {
    console.log("YES TRIGGERED but got answer wrong :(");
  }
});
client.on("quizEnd", () => {
    console.log("The quiz has ended. - bot" + cluster.worker.id);
});
