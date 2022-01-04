import {recall} from './dataRecall.js';
$(document).ready(function(){
  let mapData;

  //loop through json file and assing each state a button with an id
  $.getJSON("/scripts/states.json", function(states){

    $.each(states,function (i, state){      
      $("#map-container").append("<button title ="+state.name+" id ="+state.abbr+">"+state.abbr+"</button>");
    });

    async function initRetrieveData() {
      const dataArray = await recall.retrieveData();

      if(dataArray.length > 0){
        return mapData = dataArray;
      } else {
        initRetrieveData();
      }
    }

    initRetrieveData();

    //Link covid data to buttons buttons
    $("#map-container button").click(function( event ) {
      let tarObj = {}
      for(let i = 0; i < mapData.length; i++){
        if (mapData[i].StateAbbr == event.target.id){
          tarObj = mapData[i];
        }
      }
      $("#state-name, #stats-wrapper").css("display", "flex");
      $("#state-name").text($(this).attr("title"));
     
      $("html,body").animate({
        scrollTop: $("#state-name").offset().top
     });

     //Overall Risk Data
     $("#risk-container h3").text(tarObj.RiskLevel);
     $("#case-density").text(tarObj.DensityPerHundredThousand);
     $("#test-positivity-ratio").text("oops");
     $("#contact-tracers").text("oops");
     $("#infection-rate").text("oops");
     $("#icu-cap-ratio").text("oops");


     //Metrics
     $("#population").text(tarObj.Pop);
     $("#cases").text(tarObj.Cases);
     $("#deaths").text(tarObj.Deaths);
     $("#vaccines-completed").text(tarObj.TotalVacc);
     $("#new-cases").text(tarObj.NewCases);
     $("#new-deaths").text(tarObj.NewDeaths);

     











      
      
      console.log(tarObj);
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
  //  $("#map-container button").click(function(){
     
  //  });

   

 
  });

});

// async function handleCovidData() {
    //   const data = await recall.retrieveData();
     
    //   console.log(data[0].RiskLevel)
    //   $("#risk-container h3").text()

    //    $.each(data, function(i, data){
    //       console.log(data.RiskLevel)
    //    });