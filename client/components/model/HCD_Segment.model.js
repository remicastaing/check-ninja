'use strict';

angular.module('itechApp')
.factory('HCD_Segment', function (store, ATA2K, AWR_Segment, NRF_Segment) {

 

	return store.defineResource({
		name: 'HCD_Segment',
		idAttribute : 'HRI',    
		relations: {
			belongsTo: {
				ScheduledMaintenance: {
            // localField is for linking relations
            // user.profile -> profile of the user
            localField: 'ScheduledMaintenance',
            // foreignKey is the "join" field
            // the name of the field on a profile that points to its parent user
            localKey: 'WPI'
          }
        },
      hasMany: {
        	NRF_Segment: {
            // localField is for linking relations
            // user.comments -> array of comments of the user
            localField: 'NRF_Segments',
            // foreignKey is the "join" field
            // the name of the field on a comment that points to its parent user
            foreignKey: 'HRI'
          }
        }
      },
      methods: {
      	overview : hdcOverview,
      	toJson: function(){
          return ATA2K.toJson('HCD_Segment', this);
        },
        // type : function(){
        //   if (this.MCI) {
        //     return 'card'
        //   } else {
        //     return 'OOP card'
        //   } 
        // }
      },
      computed : {
        type : ['MCI', 'OST', 'OII', 'MII', function(MCI){
          if (OST){
            if (!OII){
              return "WO";
            }
          } else {
            if (!MII){
              return "WO";
            }
          }
          if (MCI) {
            return 'card';
          } else {
            return 'OOP'
          }
        }]
      },
      beforeUpdate : function (Resource, data, cb){
          if (data.AWR_Segment) {
            data.AWR_Segment.HRI = data.HRI;
            AWR_Segment.create(data.AWR_Segment);
          }
          data.TED = convertDate(data.TED);
          cb(null, data);
        }
    }
    );
}).run(function (HCD_Segment) {});



 function hdcOverview(complete){

    complete = typeof complete !== 'undefined' ? complete : false;


    var HRI = this.HRI.split('/');

    return complete ? {
      'type' : HRI[1],
      'index' : HRI[2],
      'HRI' : this.HRI,
      'ATA': this.ATA,
      'Identifier' : this.OST ? this.OII : this.MII,
      'Description' : this.OST ? this.OTD : this.MTD,
      'TED': this.TED,
      'MIR': this.MIR==="true"? true: false,
      'REM': this.REM,
    } :
    {
      'HRI' : this.HRI,
      'ATA': this.ATA,
      'Identifier' : this.OST ? this.OII : this.MII,
      'Description' : this.OST ? this.OTD : this.MTD
    };
  };




  function convertDate(date) {
    switch (typeof date)
    {
      case "undefined":
        date = null;
        break;
      case "object":
      case "string":
        date = date === '0001-01-01' ? null: Date.parse(date);
        break;
      case "number":
        break;

    };
    return date;
  };