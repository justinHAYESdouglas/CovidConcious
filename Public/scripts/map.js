$(document).ready(function(){


  
  //loop through json file and assing each state a button with an id
  $.getJSON("/scripts/states.json", function(json){

  
     $.each(json,function (i, json){
       $("#map-container").append("<button id ="+json.abbr+">"+json.abbr+"</button>")
     })


  //position buttons in the shape of the US
  //TODO make this not terrible   
  let blank =('<span class = "blank"></span>');
  
  $("#AK").after(blank);

     
  });

  
  
 






  
});