const pieCleanse = {
    refineString: function (string) {
        // Find percentage of beds occupied vs total beds.
        let bedRatInit = string.BedUsageTotal / string.BedCap;
        let multiplier = Math.pow(10, 2);
        bedRatInit = Math.round(bedRatInit * multiplier) / multiplier;
        string.bedRat = bedRatInit;

        let compRatio;
        let initRatio;
        let icuRatio;
        let bedRatio;

        // Create object of required values, converted to string(in case of int), split into array.
        let refineObj = {}
        if(string.CompVacc != null){
          refineObj.compRat = string.CompVacc.toString().split('');
        }
        if(string.ICUCapRatio != null){
          refineObj.icuRat = string.ICUCapRatio.toString().split('');
        }
        if(string.InitVacc != null){
          refineObj.initRat = string.InitVacc.toString().split('');
        }
        if(string.bedRat != null){
          refineObj.bedRat = string.bedRat.toString().split('');
        }
        // Remove 0. from beginning of each entry.
        if(refineObj.compRat){
          refineObj.compRat.splice(0, 2);
        }
        if(refineObj.icuRat){
          refineObj.icuRat.splice(0, 2);
        };
        if(refineObj.initRat){
          refineObj.initRat.splice(0, 2);
        };
        if(refineObj.bedRat){
          refineObj.bedRat.splice(0, 2);
        };
        console.log(refineObj);
        // Add . between index 1 and 2 of 3 digit returns.
        if(refineObj.compRat){
          refineObj.compRat.splice(2, 0, ".");
        };
        if(refineObj.initRat){
          refineObj.initRat.splice(2, 0, ".");
        };
        // Rejoin strings.
        if(refineObj.compRat){
          refineObj.compRat = refineObj.compRat.join();
        };
        if(refineObj.icuRat){
          refineObj.icuRat = refineObj.icuRat.join();
        };
        if(refineObj.initRat){
          refineObj.initRat = refineObj.initRat.join();
        };
        if(refineObj.bedRat){
          refineObj.bedRat = refineObj.bedRat.join();
        };
        // Remove all added commas from join.
        if(refineObj.compRat){
          refineObj.compRat = refineObj.compRat.replaceAll(",", "");
        };
        if(refineObj.icuRat){
          refineObj.icuRat = refineObj.icuRat.replaceAll(",", "");
        };
        if(refineObj.initRat){
          refineObj.initRat = refineObj.initRat.replaceAll(",", "");
        };
        if(refineObj.bedRat){
          refineObj.bedRat = refineObj.bedRat.replaceAll(",", "");
        };
        // Convert 3 digit returns to integers for Math.round;
        if(refineObj.compRat){
          refineObj.compRat = parseFloat(refineObj.compRat);
        };
        if(refineObj.initRat){
          refineObj.initRat = parseFloat(refineObj.initRat);
        };
        // Round 3 digit returns to nearest whole number.
        if(refineObj.compRat){
          refineObj.compRat = Math.round(refineObj.compRat);
        };
        if(refineObj.initRat){
          refineObj.initRat = Math.round(refineObj.initRat);
        };
        // Convert 3 digit returns back to strings.
        if(refineObj.compRat){
          refineObj.compRat = refineObj.compRat.toString();
        };
        if(refineObj.initRat){
          refineObj.initRat = refineObj.initRat.toString();
        };
        
        console.log(refineObj);
  
        if(refineObj.compRat){
          compRatio = refineObj.compRat;
        };
        if(refineObj.initRat){
          initRatio = refineObj.initRat;
        };
        if(refineObj.icuRat){
          icuRatio = refineObj.icuRat;
        };
        if(refineObj.bedRat){
          bedRatio = refineObj.bedRat;
        };

        return [{compRatio:compRatio, initRatio:initRatio, icuRatio:icuRatio, bedRatio:bedRatio}];
        
    }
}

export {pieCleanse};