$(document).ready(function(){
  
  $.getJSON("/scripts/states.json", function(json){
     $.each(json,function (i, json){
       $("#map-container").append("<button id ="+json.abbr+">"+json.abbr+"</button>")

     })
  });

  
});