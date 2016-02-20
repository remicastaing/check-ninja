'use strict';

angular.module('itechApp')
  .service('checkhelper', function (x2js) {
    

    function descriptionBDV(check){
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

    function MaintenanceItem(HCD_Segment){
      return {
        'HRI' : HCD_Segment.HRI,
        'ATA': HCD_Segment.ATA,
        'MII / OII' : HCD_Segment.OST ? HCD_Segment.OII : HCD_Segment.MII,
        'MTD / OTD' : HCD_Segment.OST ? HCD_Segment.OTD : HCD_Segment.MTD
      };
    };

    function CompleteMaintenanceItem(HCD_Segment){

      var HRI = HCD_Segment.HRI.split('/');

      return {
        'WPI' : HRI[0],
        'type' : HRI[1],
        'index' : HRI[2],
        'HRI' : HCD_Segment.HRI,
        'ATA': HCD_Segment.ATA,
        'MII / OII' : HCD_Segment.OST ? HCD_Segment.OII : HCD_Segment.MII,
        'MTD / OTD' : HCD_Segment.OST ? HCD_Segment.OTD : HCD_Segment.MTD,
        'TED': HCD_Segment.TED,
        'MIR': HCD_Segment.MIR=="true"? true: false,
        'REM': HCD_Segment.REM,
        'OST' : HCD_Segment.OST=="true"? true: false,
        'MII' : HCD_Segment.MII,
        'OII' : HCD_Segment.OII,
        'MTD' : HCD_Segment.MTD,
        'OTD' : HCD_Segment.OTD
      };
    };


    function MaintenanceItems(check, complete){
      complete = typeof complete !== 'undefined' ? complete : 'false';

      var MaintenanceItems = [];

      _.forIn(check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.ScheduledMaintenanceDetails,
        function(value, key) {MaintenanceItems.push(complete ? CompleteMaintenanceItem(value.MaintenanceItem.HCD_Segment) : MaintenanceItem(value.MaintenanceItem.HCD_Segment));})

      return MaintenanceItems;
    };


    function exportAsXml(check){
      var prefix = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><ScheduledMaintenance xmlns:scm="http://airbus.corp/ISDS/MIS/ScheduledMaintenance" version="3.03">';
      var sufix = '<ScheduledMaintenance';

      return vkbeautify.xml(prefix+x2js.json2xml_str(check.ScheduledMaintenance)+sufix);
    };


  	return {
      descriptionBDV: descriptionBDV,
      MaintenanceItems: MaintenanceItems,
      exportAsXml : exportAsXml
    }
  });
