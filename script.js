$(function(){
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
  
  var goButton = document.getElementById('submit');
  
  goButton.onclick = function(){
    var currentPoke = document.getElementById('poke-input').value;
    var newUrl = 'http://dubstepper.github.io/Pokedex/?poke=' + currentPoke;
    if(!currentPoke.trim().length > 0) {
        window.history.pushState({}, 'Pokedex', newUrl); 
    }
  };
});
