const Searcher = require("kahoot-search");
var search;
function searchk() {
  search.search(o=>{
    var results2 = JSON.stringify(o);
    //console.log(results['title']);
    //console.log(results2);
    var dat = JSON.parse(results2);
    var results = dat.kahoot;
    console.log(results);
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
