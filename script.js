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

    var currentPoke = document.getElementById('poke-input').value.toString().toLowerCase();

    $(document).on('click', '#share-link', function(){
      if(currentPoke.length){
        var newUrl = 'http://dubstepper.github.io/Pokedex/?poke=' + currentPoke;
      } else {
        var newUrl = 'http://dubstepper.github.io/Pokedex/';
      }
      $('.copy').val(newUrl);
      $('.copy').select();
    });

    $('#submit').click(function(){
      if($(this).css('transform') == 'none'){
        $(this).css('transform', 'perspective(150px) rotateX(360deg) rotateZ(360deg)');
        // $(this).css('width', '150px');
      } else {
        $(this).css('transform', '');
        // $(this).css('width', '100px');
      }
    });

    document.getElementById('body').onload = function(){
        goButton.click();
        $('#poke-input').focus();
    };

    goButton.onclick = function(){

      currentPoke = document.getElementById('poke-input').value.toString().toLowerCase();
      if(queryString["poke"]) var urlPoke = queryString["poke"].toString().toLowerCase();

      if(!currentPoke && urlPoke) currentPoke = urlPoke;

    if(queryString["poke"] == undefined && currentPoke.length == 0) return false;

    //loading screen
    if(currentPoke.trim().length > 0){
      $('.result').html('<i class="fa fa-spinner"></i>');
    } else {
      return false;
    }

    // if(currentPoke.trim().length > 0) {
    //     window.history.pushState({}, 'Pokedex', newUrl);
    // }
    $.getJSON('http://pokeapi.co/api/v2/pokemon/' + currentPoke.toString().toLowerCase()).done(function(result){
        if(currentPoke == parseInt(currentPoke)) currentPoke = result['name'].toLowerCase();
        var path = 'http://www.pkparaiso.com/imagenes/xy/sprites/animados/' + currentPoke.toLowerCase() + '.gif';
        if(currentPoke.length > 0){
          $('.intro').html('');
          var abilities = '';
          $('.result').html(
          '<img src="' + path + '">' +
          '<h1 class="poke-name">#' + result["national_id"] + ' - ' + result["name"] + '</h1>' +
          '<p class="stats">HP: ' + result["hp"] + '</p>' +
          '<p class="stats">Attack: ' + result["attack"] + '</p>' +
          '<p class="stats">Defense: ' + result["defense"] + '</p>' +
          '<p class="stats">Sp. Atk: ' + result["sp_atk"] + '</p>' +
          '<p class="stats">Sp. Def: ' + result["sp_def"] + '</p>' +
          '<p class="stats">Speed: ' + result["speed"] + '</p>'
          );
        }

    }).fail(function(){
      $('.result').html('<h1 class="poke-name">Sorry, we couldn\'t find that Poke :(</h1>');
    });
  };

  $('#poke-input').keypress(function(e){
    if(e.which == 13) goButton.click();
  });
});
