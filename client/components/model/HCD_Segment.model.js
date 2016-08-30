'use strict';

angular.module('itechApp')
.factory('HCD_Segment', function (store, ATA2K, AWR_Segment, NRF_Segment, PAR_Segment, IPT_Segment) {

 

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

          var hcd_json = ATA2K.toJson('HCD_Segment', this);


          if (this.NRF_Segments.length>0) {
            hcd_json.NRF_Segment = _.map(this.NRF_Segments).map(function (nrf) {
              console.log(nrf);
              return nrf.toJson();
            });
          }

          if (typeof this.AWR_Segment === 'object' ) {
            hcd_json.AWR_Segment = ATA2K.toJson('AWR_Segment', this.AWR_Segment);
          }

          var res = {
              MaintenanceItem : {
                HCD_Segment : hcd_json
              }
            }

          if (this.PAR_Segments.length>0) {
              res.PAR_Segment = _(this.PAR_Segments).map(function(par_segment){
                return par_segment.toJson(); 
              }).value();
          }

          if (this.IPT_Segments.length>0) {
              res.IPT_Segment = _(this.IPT_Segments).map(function(ipt_segment){
                return ipt_segment.toJson(); 
              }).value();
          }        
          
          return res;
        },
      },
      computed: {
        // object passed to Object.defineProperty
        type: {
          // default is false
          enumerable: true,
          get: function () {
            return this.HRI.split('/')[1];
          },
        },
        MIR: {
          // default is false
          enumerable: true,
          get: function () {
            return this.NRF_Segments.length;
          },
        }
      },
      beforeUpdate : function (Resource, data, cb){
          if (data.AWR_Segment) {
            data.AWR_Segment.HRI = data.HRI;
            AWR_Segment.create(data.AWR_Segment);
          }
          data.TED = convertDate(data.TED);
          cb(null, data);
        },
      beforeDestroy: beforeDestroyHCDSegment
    }
    );


  function beforeDestroyHCDSegment(Resource, hcd, cb) {

    if (hcd.type == 4) {
      AWR_Segment.destroy(hcd.HRI).then(function(){
        cb(null, hcd);
      });
    }
    else {
      cb(null, hcd);
    }
  };

}).run(function (HCD_Segment) {});



 function hdcOverview(){

    var HRI = this.HRI.split('/');

    var res =  HRI[1]!= 4 ? {
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