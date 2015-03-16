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

  var goButton = document.getElementById('submit'),
    pokeInput = document.getElementById('poke-input');

    function getPoke(url, callback){
      var req = new XMLHttpRequest();

      req.onreadystatechange = function(){
        if(req.readystate == 4 && req.status == 200) callback(req.responseText);
      };
      req.open('GET', url, true);
      req.send(null);

    }

  goButton.onclick = function(){

    //loading screen
    $('.result').html('<i class="fa fa-spinner"></i>');

    var currentPoke = document.getElementById('poke-input').value,
      path = './img/' + currentPoke + '.gif';
    var newUrl = 'http://dubstepper.github.io/Pokedex/?poke=' + currentPoke;
    // if(currentPoke.trim().length > 0) {
    //     window.history.pushState({}, 'Pokedex', newUrl);
    // }
    $.getJSON('http://pokeapi.co/api/v1/pokemon/' + currentPoke.toString().toLowerCase(), function(result){
      $('.intro').html('');
      $('.poke-name').text(result["name"]);
      $('.result').html(
      '<img src="' + path + '">' +
      '<h1 class="poke-name">' + result["name"] + '</h1>');
    });
  };

  $('#poke-input').keypress(function(e){
    if(e.which == 13) goButton.click();
  });
});
