'use strict';

angular.module('itechApp')
.service('checkStoreService', function (Check, $state, checkhelper, $q) {

  //var Check = store.defineResource('check');

  function save(check){

    check.WPI = check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment.WPI;
    Check.create(check)
    .then(function(data) {
      $state.go('checks');
      console.log('stored: ');
      Check.findAll().then(function (checks) {
        console.log(checks);
      });

    });
  };


  function getList(){

    return Check.keys();


  };

function getOverview(){

  var overview = [];
  console.log('getOverview');
  Check.findAll().then(function(checks){
    console.log('checks:');
    _(checks).forEach(function(check){
      console.log(check);
      var executedItems = 0;
        _(check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.ScheduledMaintenanceDetails).forEach(function(MaintenanceItem){

          executedItems += MaintenanceItem.MaintenanceItem.HCD_Segment.TED ==='0001-01-01' ? 0 : 1;
        });
        overview.push({
          WPI : check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment.WPI,
          items : check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.ScheduledMaintenanceDetails.length,
          executedItems : executedItems
        });
    });
  });  

  return overview;

};

function getCheck(WPI){
  return Check.find(WPI);
};

function deleteCheck(key, cb){
  return Check.destroy(key);
};

function findItem (check, index){

  var MaintenanceItems = checkhelper.MaintenanceItems(check, true);

  return _.find(MaintenanceItems, {'index' : index});
};


function getItem(WPI, index){


  var getItemByIndex = _.partialRight(findItem, index);

  return  Check.getItem(WPI)
  .then(JSON.parse)
  .then(getItemByIndex);
}

return {
  save : save,
  getList : getList,
  getOverview : getOverview,
  deleteCheck : deleteCheck,
  getCheck : getCheck,
  getItem : getItem
}


});
