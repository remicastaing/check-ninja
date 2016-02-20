'use strict';

angular.module('itechApp')
.service('checkStoreService', function ($localForage, checkhelper, $q) {

  var checkStore = $localForage.createInstance({
   name: 'check-store',
   driver: 'localStorageWrapper'
  });

  function store(check){

    var key = check.ScheduledMaintenance.ScheduledMaintenanceEvents.WorkPackageDetails.WPI_Segment.WPI;


    checkStore.setItem(key,JSON.stringify(check))
    .then(function(data) {
      console.log('stored: ');
    });
  };


  function getList(){

    return checkStore.keys();


  };

function getOverview(){
  var overview = [];

  checkStore.keys().then(function(keys){
    _(keys).forEach(function(key){
      checkStore.getItem(key)
      .then(JSON.parse)
      .then(function(check){
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
  });
  

  return overview;

};

function getCheck(WPI){
  return checkStore.getItem(WPI).then(JSON.parse);
};

function deleteCheck(key, cb){
  return checkStore.removeItem(key, cb);
};

function findItem (check, index){

  var MaintenanceItems = checkhelper.MaintenanceItems(check, true);

  return _.find(MaintenanceItems, {'index' : index});
};


function getItem(WPI, index){


  var getItemByIndex = _.partialRight(findItem, index);

  return  checkStore.getItem(WPI)
  .then(JSON.parse)
  .then(getItemByIndex);
}

return {
  store : store,
  getList : getList,
  getOverview : getOverview,
  deleteCheck : deleteCheck,
  getCheck : getCheck,
  getItem : getItem
}


});
