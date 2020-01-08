const Searcher = require("kahoot-search");
const config = {
  author: "KahootStudio",
  questionLength: 9
};
const search = new Searcher("January", config);
search.search().then(results=>{
  console.log(results);
  //var dat = JSON.parse(results);
  console.log(results['questions']);
});
