const Searcher = require("kahoot-search");
const config = {
  author: "KahootStudio",
  questionLength: 9
};
const search = new Searcher("January", config);
search.search().then(results=>{
  var results2 = JSON.stringify(results);
  //console.log(results['title']);
  //console.log(results2);
  var dat = JSON.parse(results2);
  let configKeys = Object.keys(dat.questions);
configKeys.forEach((rand)=>{
	console.log(rand);
	var itemKeys = Object.keys(dat[rand]);
  console.log(itemKeys);
  for(var i=0;i<itemKeys.length;i++){
  	let randName = itemKeys[i];
  	console.log(config.configuration[rand][randName]['choices']);
    //console.log(config.configuration[rand][randName]['key2']);
  }
});
  var correct = dat['Language'];
  //['0']['choices']['0']['correct'];
  console.log(correct + " X D " + results['Language'] + " " + results.uuid);
});
