const Searcher = require("kahoot-search");
const search;
const config;
search.search(o=>{
  var results2 = JSON.stringify(o);
  //console.log(results['title']);
  //console.log(results2);
  var dat = JSON.parse(results2);
  var results = dat.kahoot.title;
  console.log(results);
}).then(results=>{
});
module.exports.search = function (name, type, questioncount, answercount) {
  var amount;
  for (var i = 0; i < answercount.length; i++) {
    amount = answercount[i] + amount;
  }
  console.log("Amount: " + amount):
  const config = {
    questionLength: questioncount,
    limit: 1,
    type: type,
    searchStrictly: true
  };
  search = new Searcher(name, config);
}
