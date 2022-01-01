$(document).ready(function(){

  //loop through json file and assing each state a button with an id
  $.getJSON("/scripts/states.json", function(json){

    $.each(json,function (i, json){
      $("#map-container").append("<button id ="+json.abbr+">"+json.abbr+"</button>")
    });

  //position buttons in the shape of the US
  let blank = '<span class = "blank"></span>';
  
  $("#AK, #ME").after(blank.repeat(10));
  $("#MI, #FL").after(blank.repeat(2));
  $("#MA, #RI").after(blank.repeat(1));
  $("#DE, #GA, #HI").after(blank.repeat(3));
  $("#DC").after(blank.repeat(6));
  $("#TX").after(blank.repeat(4));
     
  });

  
  
 






  
});