'use strict';

var ScheduledMaintenance

angular.module('itechApp')
.factory('ScheduledMaintenance', function (store, HDR_Segment, AID_Segment, WPI_Segment, HCD_Segment, AWR_Segment, ATA2K, x2js) {
  ScheduledMaintenance= store.defineResource({
    name: 'ScheduledMaintenance',
    idAttribute : 'WPI',
    relations: {
      hasOne: {
        HDR_Segment: {
          localKey: 'WPI',
          localField: 'HDR_Segment'
        },
        AID_Segment: {
          localKey: 'WPI',
          localField: 'AID_Segment'
        },
        WPI_Segment: {
          localKey: 'WPI',
          localField: 'WPI_Segment'
        }                
      },
      hasMany: {
        HCD_Segment: {
            // localField is for linking relations
            // user.comments -> array of comments of the user
            localField: 'HCD_Segments',
            // foreignKey is the "join" field
            // the name of the field on a comment that points to its parent user
            foreignKey: 'WPI'
          },
        AWR_Segment: {
            // localField is for linking relations
            // user.comments -> array of comments of the user
            localField: 'AWR_Segments',
            // foreignKey is the "join" field
            // the name of the field on a comment that points to its parent user
            foreignKey: 'WPI'
          }
        }
      },
      methods: {
        // global instance method
        overview: overview,
        HCD_SegmentNumber : HCD_SegmentNumber,
        AWR_SegmentNumber : AWR_SegmentNumber,
        itemNumber: itemNumber,
        executedItem: executedItem,
        performedHCD_SegmentNumber : performedHCD_SegmentNumber,
        maintenanceItemOverview : maintenanceItemOverview,
        exportAsXml : function (){
          var prefix = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><ScheduledMaintenance xmlns:scm="http://airbus.corp/ISDS/MIS/ScheduledMaintenance" version="3.03">';
          var sufix = '</ScheduledMaintenance>';
          return vkbeautify.xml(prefix+x2js.json2xml_str(this.toJson())+sufix);
        },
        toJson : toJson
      },
      beforeCreate: beforeCreateScheduledMaintenance,
      beforeDestroy: beforeDestroyScheduledMaintenance
    });



  function beforeCreateScheduledMaintenance(Resource, check, cb){
    var WPI = check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment.WPI
    var scheduledMaintenance = {
      WPI : WPI
    };
    check.ScheduledMaintenance.HDR_Segment.id = WPI;
    check.ScheduledMaintenance.ScheduledMaintenanceEvents.AID_Segment.id = WPI;

    var hcd = _.filter(check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.ScheduledMaintenanceDetails, function(ScheduledMaintenanceDetails){
      return !ScheduledMaintenanceDetails.MaintenanceItem.HCD_Segment.AWR_Segment;
    })

    var awr = _.filter(check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.ScheduledMaintenanceDetails, function(ScheduledMaintenanceDetails){
      return ScheduledMaintenanceDetails.MaintenanceItem.HCD_Segment.AWR_Segment;
    })


    var createHcdSegments= _.map(hcd, function(ScheduledMaintenanceDetails){
      var hcdSegment = ScheduledMaintenanceDetails.MaintenanceItem.HCD_Segment;
      hcdSegment.WPI = WPI;
      return HCD_Segment.create(hcdSegment);
    });

    var createAwrSegments= _.map(awr, function(ScheduledMaintenanceDetails){
      var awrSegment = ScheduledMaintenanceDetails.MaintenanceItem.HCD_Segment.AWR_Segment;
      awrSegment.WPI = WPI;
      return AWR_Segment.create(awrSegment);
    });

    var createSegments = _.concat(createHcdSegments, createAwrSegments);
    createSegments.push(HDR_Segment.create(check.ScheduledMaintenance.HDR_Segment));
    createSegments.push(AID_Segment.create(check.ScheduledMaintenance.ScheduledMaintenanceEvents.AID_Segment));
    createSegments.push(WPI_Segment.create(check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment));
    //createSegments.push(this.create(scheduledMaintenance));

    store.utils.Promise.all(createSegments).then(function(){
      cb(null, scheduledMaintenance);
    }, function(err){console.log(err);});


  }

  function beforeDestroyScheduledMaintenance(Resource, scheduledMaintenance, cb) {

    var WPI = scheduledMaintenance[Resource.idAttribute];
    var del = _.concat(
                        _.map(scheduledMaintenance.HCD_Segments, function(hcd){
                         return HCD_Segment.destroy(hcd.HRI);
                       }),
                         _.map(scheduledMaintenance.AWR_Segments, function(awr){
                         return AWR_Segment.destroy(awr.HRI);
                       }));
    del.push(HDR_Segment.destroy(WPI));
    del.push(AID_Segment.destroy(WPI));
    del.push(WPI_Segment.destroy(WPI));
    

    store.utils.Promise.all(del).then(function(){
      cb(null, scheduledMaintenance);
    })
  };

  ScheduledMaintenance.overview = function(){
    return ScheduledMaintenance
    .findAll(null,{useFilter : true})
    .then(
      function (sm){
        var stack = _.map(sm, function(sm1){
          return sm1.overview();
        });
        return store.utils.Promise.all(stack);
      }
      );
  };

  ScheduledMaintenance.description = description;

  ScheduledMaintenance.replaceByNull = replaceByNull;

  return ScheduledMaintenance;
}).run(function (ScheduledMaintenance) {});




function overview() {
  return ScheduledMaintenance
  .loadRelations(this, ['HCD_Segments', 'AWR_Segments'])
  .then(function(sm){
    return {
      WPI : sm.WPI,
      items : sm.itemNumber(),
      executedItems : sm.executedItem()
    };
  });


};

function iterateCountPerformedItem(memo, HCD_Segment){
  return memo + 1-1*(HCD_Segment.TED ===null);
}

function maintenanceItemOverview (complete){
  complete = typeof complete !== 'undefined' ? complete : false;

  var MaintenanceItems = [];

  _.forIn(this.HCD_Segments,
    function(hcd_segment, key) {MaintenanceItems.push(hcd_segment.overview(complete));});

  _.forIn(this.AWR_Segments,
    function(awr_segment, key) {MaintenanceItems.push(awr_segment.overview(complete));});

  return MaintenanceItems;

  //return _.map(this.HCD_Segments, function(hcd) { return HCD_Segment.methods.overview2.apply(hcd,complete); });
};

function performedHCD_SegmentNumber () {
  return _.reduce(this.HCD_Segments,  iterateCountPerformedItem, 0);
};

function executedItem () {
  return _.reduce(_.concat(this.HCD_Segments, this.AWR_Segments),  iterateCountPerformedItem, 0);
};

function HCD_SegmentNumber() {
  return this.HCD_Segments.length;
}

function AWR_SegmentNumber() {
  return this.AWR_Segments.length;
}

function itemNumber(){
  return this.HCD_Segments.length + this.AWR_Segments.length;
}
function toJson(){
  return {

    HDR_Segment : this.HDR_Segment.toJson(),
    ScheduledMaintenanceEvents: {
      AID_Segment : this.AID_Segment.toJson(),
      WorkPackageDetails: {
        WPI_Segment : this.WPI_Segment.toJson(),
        ScheduledMaintenanceDetails : _.concat(
          _(this.HCD_Segments).filter('TED').map(function(hcd_segment){return {MaintenanceItem : {HCD_Segment :hcd_segment.toJson()}}; }).value(),
          _(this.AWR_Segments).filter('TED').map(function(awr_segment){return {MaintenanceItem : {HCD_Segment :awr_segment.toJson()}}; }).value()
          )
      }
    }
    
  }
}



function description(check){
  return {
    AMC : check.ScheduledMaintenance.ScheduledMaintenanceEvents.AID_Segment.AMC,
    AIN : check.ScheduledMaintenance.ScheduledMaintenanceEvents.AID_Segment.AIN,
    REG : check.ScheduledMaintenance.ScheduledMaintenanceEvents.AID_Segment.REG,
    WPI : check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment.WPI,
    WOD : check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment.WOD,
    MCI : check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment.MCI,
    MCV : check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment.MCV,
    CTH : check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment.CTH,
    CTY : check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment.CTY,
  };


};

function replaceByNull(check){
  return _.forEach(
    check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.ScheduledMaintenanceDetails,
    function(MaintenanceItem){
      MaintenanceItem.MaintenanceItem.HCD_Segment.TED = MaintenanceItem.MaintenanceItem.HCD_Segment.TED==='0001-01-01' ? null : MaintenanceItem.MaintenanceItem.HCD_Segment.TED;
    });
}
