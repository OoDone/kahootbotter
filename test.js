const Searcher = require("kahoot-search");
const config = {
  author: "KahootStudio",
  questionLength: 9
};
const search = new Searcher("January", config);
search.search().then(results=>{
  var results2 = JSON.stringify(results);
  //console.log(results['title']);
  console.log(results2);
  var dat = JSON.parse(results2);
  var correct = dat['type'];
  //['0']['choices']['0']['correct'];
  console.log(correct + " X D " + results['type']);
});
