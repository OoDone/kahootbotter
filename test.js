const Searcher = require("kahoot-search");
var search;
var questions;
function searchk() {
  search.search(o=>{
    var kahoot = o.kahoot;
    var xd = o.kahoot.questions['0'].choices['0'].correct;
    var results2 = JSON.stringify(o);
    var results3 = JSON.stringify(xd);
    questions = o.kahoot.questions;
    //console.log(results['title']);
    //console.log(results2);
    var dat = JSON.parse(results2);
    var results = dat.kahoot.questions;
    console.log(results3);
    global.questions = questions;
  });
}
module.exports.searchs = function (name, type, questioncount, answercount) {
  var amount;
  /*for (var i = 0; i < answercount.length; i++) {
    amount = answercount[i] + amount;
  }*/
  console.log("Amount: " + amount);
  const config = {
    questionLength: questioncount,
    limit: 1,
    type: [type],
    searchStrictly: true
  };
  search = new Searcher(name, config);
  searchk();
}
