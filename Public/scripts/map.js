import {recall} from './dataRecall.js';
import {pieCleanse} from './pieCleanse.js';
$(document).ready(function(){
  
  $.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}
  
  let mapData;
  //loop through json file and assing each state a button with an id
  $.getJSON("/scripts/states.json", function(states){

    $.each(states,function (i, state){      
      $("#map-container").append("<button title ="+state.name+" id ="+state.abbr+">"+state.abbr+"</button>");
    });

    //Link covid data to map buttons    
    async function initRetrieveData() {
      const dataArray = await recall.retrieveData();
      if(dataArray.length > 1){
        return mapData = dataArray;
      } else {
        initRetrieveData();
      }
    }
    initRetrieveData();
    
    $("#map-container button").click(function( event ) {
      let tarObj = {}
      for(let i = 0; i < mapData.length; i++){
        if (mapData[i].StateAbbr == event.target.id){
          tarObj = mapData[i];
        }
      }
      console.log(tarObj);
      $("#state-name, #stats-wrapper").css("display", "flex");
      $("#state-name").text($(this).attr("title"));
     
      $("html,body").animate({
        scrollTop: $("#state-name").offset().top
     });

     //Overall Risk Data
     $("#risk-container h3").text(tarObj.RiskLevelRl);
     $("#case-density").text(tarObj.DensityRl);
     $("#test-positivity-ratio").text(tarObj.PositiveRatioRl);
     $("#contact-tracers").text(tarObj.ContactTracersRl);
     $("#infection-rate").text(tarObj.InfectionRateRl);
     $("#icu-cap-ratio").text(tarObj.ICUCapRatRl);

     //Change color of risklevel depending on serverity
     if ($("h3").text()  >= 2){
      $("h3").css("filter", "drop-shadow(0 0 0.5rem orange)")
     } if($("h3").text() >= 5){
      $("h3").css("filter", "drop-shadow(0 0 0.7rem crimson)")
     }

     //Metrics
     if (tarObj.Pop != null){
      $("#population").text(tarObj.Pop).digits();
     } else if (tarObj.Pop == null){
      $("#population").text("N/A");
     }
     if (tarObj.Cases != null){
      $("#cases").text(tarObj.Cases).digits();
     } else if (tarObj.Cases == null){
      $("#cases").text("N/A");
     }
     if (tarObj.Deaths != null){
      $("#deaths").text(tarObj.Deaths).digits();
     } else if (tarObj.Deaths == null){
      $("#deaths").text("N/A");
     }
     if (tarObj.TotalVacc != null){
      $("#vaccines-completed").text(tarObj.TotalVacc).digits();
     } else if (tarObj.TotalVacc == null){
      $("#vaccines-completed").text("N/A");
     }
     if (tarObj.NewCases != null){
      $("#new-cases").text(tarObj.NewCases).digits();
     } else if (tarObj.NewCases == null){
      $("#new-cases").text("N/A");
     }
     if (tarObj.NewDeaths != null){
      $("#new-deaths").text(tarObj.NewDeaths).digits();
     } else if (tarObj.NewDeaths == null){
      $("#new-deaths").text("N/A");
     }
    // Pie Chart

    // Refactor and cleanse data from tarObj into usable percentages.
     let returnedData = pieCleanse.refineString(tarObj);
     console.log(returnedData);
    // Change data-percent to new percentage values
     if(returnedData[0].compRatio != undefined){
      $("#vaccine-completed-ratio").show();
      $("#vaccine-completed-ratio").attr("data-percent", returnedData[0].compRatio);
     } else{
      $("#vaccine-completed-ratio").hide();
     }
     if(returnedData[0].initRatio != undefined){
      $("#vaccine-initiated-to-complete").show();
      $("#vaccine-initiated-to-complete").attr("data-percent", returnedData[0].initRatio);
     } else{
      $("#vaccine-initiated-to-complete").hide();
     }
     if(returnedData[0].icuRatio != undefined){
      $("#icu-cap-rat").show();
      $("#icu-cap-rat").attr("data-percent", returnedData[0].icuRatio);
     } else{
      $("#icu-cap-rat").hide();
     }
     if(returnedData[0].bedRatio != undefined){
      $("#beds-used-rat").show();
      $("#beds-used-rat").attr("data-percent", returnedData[0].bedRatio);
     } else{
      $("#beds-used-rat").hide();
     }
    // Call easy-pie-chart.
     $('.chart').easyPieChart({});
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