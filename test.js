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
  var results = dat.kahoot.title;
  console.log(results);
}).then(results=>{
});
