//variables
var queryString = [],
  query = window.location.search.substring(1),
  vars = query.split("&");

//GET url parameters
var getUrlParams = function (){

    for(i = 0; i < vars.length; i++){
      var pair = vars[i].split("=");
      if(typeof queryString[pair[0]] === "undefined"){
        queryString[pair[0]] = pair[1];
      } else if(typeof queryString[pair[0]] === "string"){
        var arr = [queryStrings[pair[0]], pair[1]];
        queryString[pair[0]] = pair[1];
      } else {
        queryString[pair[0]].push(pair[1]);
      }
    }
    return queryString;
} ();

var goButton = document.getElementsByClassName('submit');
goButton.onclick = function(){
   window.history.pushState({}, "Pokedex", 'file:///C:/Users/Dubsteppers/Documents/GitHub/Pokedex/index.html');
};
