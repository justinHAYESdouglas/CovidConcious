$(document).ready(function(){

  //loop through json file and assing each state a button with an id
  $.getJSON("/scripts/states.json", function(states){
   
    $.each(states,function (i, state){      
      $("#map-container").append("<button title ="+state.name+" id ="+state.abbr+">"+state.abbr+"</button>");
    });

    //position buttons in the shape of the US
    let blank = '<span class = "blank"></span>';
  
    $("#AK, #ME").after(blank.repeat(10));
    $("#MI, #FL").after(blank.repeat(2));
    $("#MA, #RI").after(blank.repeat(1));
    $("#DE, #GA, #HI").after(blank.repeat(3));
    $("#DC").after(blank.repeat(6));
    $("#TX").after(blank.repeat(4));

    //display state's stats when a state is clicked
   $("#map-container button").click(function(){
      $("#state-name, #stats-wrapper").css("display", "flex");
      $("#state-name").text($(this).attr("title"));
      $("html,body").animate({
        scrollTop: $("#state-name").offset().top
     });
   });

  });

});