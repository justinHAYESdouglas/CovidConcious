const pieCleanse = {
    refineString: function (string) {
        // Find percentage of beds occupied vs total beds.
        let bedRatInit = string.BedUsageTotal / string.BedCap;
        let multiplier = Math.pow(10, 2);
        bedRatInit = Math.round(bedRatInit * multiplier) / multiplier;
        string.bedRat = bedRatInit;
        // Create object of required values, converted to string(in case of int), split into array.
        let refineObj = {}
        if(string.CompVacc != null){
          refineObj.compRat = parseFloat(string.CompVacc);
        }
        if(string.ICUCapRatio != null){
          refineObj.icuRat = parseFloat(string.ICUCapRatio);
        }
        if(string.InitVacc != null){
          refineObj.initRat = parseFloat(string.InitVacc);
        }
        if(string.bedRat != null){
          refineObj.bedRat = parseFloat(string.bedRat);
        }
        // Remove all added commas from join.
        if(refineObj.compRat){
          refineObj.compRat = refineObj.compRat * 100;
        };
        if(refineObj.icuRat){
          refineObj.icuRat = refineObj.icuRat * 100;
        };
        if(refineObj.initRat){
          refineObj.initRat = refineObj.initRat * 100;
        };
        if(refineObj.bedRat){
          refineObj.bedRat = refineObj.bedRat * 100;
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
        if(refineObj.icuRat){
          refineObj.icuRat = refineObj.icuRat.toString();
        }
        if(refineObj.bedRat){
          refineObj.bedRat = refineObj.bedRat.toString();
        }
        return [{compRatio:refineObj.compRat, initRatio:refineObj.initRat, icuRatio:refineObj.icuRat, bedRatio:refineObj.bedRat}];
    }
}

export {pieCleanse};