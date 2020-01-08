const Searcher = require("kahoot-search");
const config = {
  author: "KahootStudio",
  questionLength: 9
};
const search = new Searcher("January", config);
search.search(o=>{
  var results2 = JSON.stringify(o);
  //console.log(results['title']);
  //console.log(results2);
  var dat = JSON.parse(results2);
  var correct = Object.keys(dat);
  var results = dat.kahoot.title;
  console.log(results);
  console.log(correct);
}).then(results=>{
  var results2 = JSON.stringify(results);
  //console.log(results['title']);
  //console.log(results2);
  var dat = JSON.parse(results2);
  var correct = Object.keys(dat);
  console.log(correct);
  //['0']['choices']['0']['correct'];
  //console.log(correct + " X D " + results['Language'] + " " + results.uuid);
});
