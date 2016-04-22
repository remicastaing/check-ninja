(function() {
  'use strict';

  angular
    .module('itechApp')
    .controller('store', store)
    .service('ScheduledMaintenance', ScheduledMaintenance);

  function store( checkStoreService)  {
    var store = new JSData.DS();

    store.registerAdapter('localforage', new DSLocalForageAdapter(), { default: true });

    return store;
  };



  function ScheduledMaintenance(store) {
    return store.defineResource({
      name: 'ScheduledMaintenance',
      endpoint: 'scheduledMaintenances'
    });
  };

  function InstalledPart(store) {
    return store.defineResource({
      name: 'installedPart',
      endpoint: 'installedParts'
    });
  };
	

  function HDR_Segment(store) {
    return store.defineResource({
      name: 'HDR_Segment',
      endpoint: 'HDR_Segments'
    });
  };

  function ScheduledMaintenanceEvents(store) {
    return store.defineResource({
      name: 'ScheduledMaintenanceEvents',
      endpoint: 'ScheduledMaintenanceEvents'
    });
  };

  function AID_Segment(store) {
    return store.defineResource({
      name: 'AID_Segment',
      endpoint: 'AID_Segments'
    });
  };

  function WorkPackageDetails(store) {
    return store.defineResource({
      name: 'WorkPackageDetails',
      endpoint: 'WorkPackageDetails'
    });
  };

  function WPI_Segment(store) {
    return store.defineResource({
      name: 'WPI_Segment',
      endpoint: 'WPI_Segments'
    });
  };

  function MaintenanceItem(store) {
    return store.defineResource({
      name: 'MaintenanceItem',
      endpoint: 'MaintenanceItems'
    });
  };

  function HCD_Segment(store) {
    return store.defineResource({
      name: 'HCD_Segment',
      endpoint: 'HCD_Segments'
    });
  };

})();