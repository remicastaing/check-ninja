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
          },
          PAR_Segment: {
            // localField is for linking relations
            // user.comments -> array of comments of the user
            localField: 'PAR_Segments',
            // foreignKey is the "join" field
            // the name of the field on a comment that points to its parent user
            foreignKey: 'HRI'
          },
          IPT_Segment: {
            // localField is for linking relations
            // user.comments -> array of comments of the user
            localField: 'IPT_Segments',
            // foreignKey is the "join" field
            // the name of the field on a comment that points to its parent user
            foreignKey: 'HRI'
          }
        }
      },
      methods: {
      	overview : hdcOverview,
      	toJson: function(){
          console.log(this);
          var json = ATA2K.toJson('HCD_Segment', this);
          if (this.AWR_Segment>0) {
            json.AWR_Segment = ATA2K.toJson('AWR_Segment', this.AWR_Segment);
          }

          if (this.NRF_Segments.length>0) {
            json.NRF_Segment = _.map(this.NRF_Segments).map(function (nrf) {
              console.log(nrf);
              return nrf.toJson();
            });
          }          
          
          return json;
        },
      },
      computed: {
        // object passed to Object.defineProperty
        type: {
          // default is false
          enumerable: true,
          get: function () {
            return this.HRI.split('/')[1];
          }
        }
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



 function hdcOverview(){

    var HRI = this.HRI.split('/');

    var res =  this.type != 4 ? {
      'type' : HRI[1],
      'index' : HRI[2],
      'HRI' : this.HRI,
      'WPI' : this.WPI,
      'ATA': this.ATA,
      'Identifier' : this.OST ? this.OII : this.MII,
      'Description' : this.OST ? this.OTD : this.MTD,
      'TED': this.TED,
      'MIR': this.MIR==="true"? true: false,
      'REM': this.REM,
    } : 
    {
      'type' : HRI[1],
      'index' : HRI[2],
      'HRI' : this.HRI,
      'WPI' : this.WPI,
      'ATA': this.AWR_Segment.ATA,
      'Identifier' : this.AWR_Segment.TWI,
      'Description' : this.AWR_Segment.FDT,
      'TED': this.TED,
      'MIR': this.MIR==="true"? true: false,
      'REM': this.AWR_Segment.REM,
    }

    return res;


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