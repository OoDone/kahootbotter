const path = require('path');
const search = require(path.join(__dirname,"..","search.js"));
const config = {
  cursor: 0,
  limit: 100,
  order: null,
  usage: [],
  type: [],
  language: ["es"],
  questionLength: null,
  author: "",
  includeKahoot: true,
  includeCard: false,
  searchStrictly: true
};
const s = new search("minecraft",config);
s.search(o=>{
  return o.kahoot.created == 1478116535317;
}).then(d=>{
  console.log(d);
});
