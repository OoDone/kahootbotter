const Searcher = require("kahoot-search");
const search = new Searcher("node js");
search.search().then(results=>{
  console.log(results);
});
