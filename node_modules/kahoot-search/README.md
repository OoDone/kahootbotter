# About
kahoot-search is an API for searching kahoot.
![NPM](https://nodei.co/npm/kahoot-search.png)

# Basic Example
```js
const Searcher = require("kahoot-search");
const search = new Searcher("node js");
search.search().then(results=>{
  //do stuff
});
```

## Documentation / How to use
### `new Searcher(query, config)` - Base class.  
*query (string)* - The search term.  
*config (object)* - Config settings.  
#### Config Variables
`cursor` - This number is basically like the "load more" button on kahoot.  
`limit` - A number that specifies how many items to be in the search. (1-100)  
`order` - A string to sort by "relevance", "quality", or "played"  
`usage` - A list of who the quiz was made by ("teacher","student","businuess","social")  
`type` - A list of the type of quiz ("quiz","poll","jumble","survey")  
`language` - A list of language codes (en, es, fr, ...)  
`questionLength` - A number that specifies how man questions the results must have. Requires includeKahoot to be true.  
`author` - A string that specifies the user who made the quiz. Results will only include the ones made by the author. Requires includeKahoot to be true  
`includeKahoot` - A boolean that specifies whether the results should include the kahoot data. Default is true  
`includeCard` - A boolean that specifies whether the results should include the card data which include images, base description and tags  
`searchStrictly` -  A boolean that only returns the results where the names exactly match the query.  

### `searcher.search(function)`
`function` - the custom filter function. Optional.  
Returns `Promise`  

## Examples
See `tests/`.
