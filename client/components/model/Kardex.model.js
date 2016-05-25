'use strict';

angular.module('itechApp')
.factory('Kardex', function (store, HDR_Segment, AID_Segment, InstalledPart) {
  var Kardex = store.defineResource({
    name: 'Kardex',
    idAttribute : 'REG',
    relations: {
      hasOne: {
        HDR_Segment: {
          localKey: 'REG',
          localField: 'HDR_Segment'
        },
        AID_Segment: {
          localKey: 'REG',
          localField: 'AID_Segment'
        }               
      },
      hasMany: {
        InstalledPart: {
            // localField is for linking relations
            // user.comments -> array of comments of the user
            localField: 'InstalledParts',
            // foreignKey is the "join" field
            // the name of the field on a comment that points to its parent user
            foreignKey: 'REG'
          }
        }
      },
      beforeCreate: beforeCreate
    }
  );

  function beforeCreate(Resource, kdx, cb){
    var REG = kdx.Kardex.AircraftInformation.AID_Segment.REG;

    kdx.Kardex.AircraftInformation.AID_Segment.id = REG;
    var kardex = {
      REG : REG
    };
    kdx.Kardex.HDR_Segment.id = REG;


    var createSegments= _.map(kdx.Kardex.AircraftInformation.InstallDetails.InstalledPart, function(part){
      part.REG= REG;
      InstalledPart.create(part);
    });
    createSegments.push(HDR_Segment.create(kdx.Kardex.HDR_Segment));
    createSegments.push(AID_Segment.create(kdx.Kardex.AircraftInformation.AID_Segment));


     store.utils.Promise.all(createSegments).then(function(){
        cb(null, kardex);
     });
  };

  Kardex.partList = function(InstallDetails){
      var partList = [];

      function makePartList(InstalledParts, NHA){
        InstalledParts = InstalledParts.constructor === Array ? InstalledParts : [InstalledParts];

        _(InstalledParts).forEach(function(InstalledPart){
          var part = {
            CPI : InstalledPart.CPI,
            MPN : InstalledPart.MPN,
            SER: InstalledPart.SER,
            PDT: InstalledPart.PDT,
            CLE : InstalledPart.CLE,
            NHA : NHA,
          };
          partList.push(part);
          if (InstalledPart.hasOwnProperty('InstalledPart')) {
            part.$$treeLevel = 0 + InstalledPart.CLE -1;
            makePartList(InstalledPart.InstalledPart, InstalledPart.CPI);
          }
          

        });

        return partList;

        

      };

      return makePartList(InstallDetails);

    }

  return Kardex;

})
.factory('InstalledPart', function (store) {
  return store.defineResource({
    name: 'InstalledPart',
    relations: {
      belongsTo: {
        Kardex: {
            // localField is for linking relations
            // user.profile -> profile of the user
            localField: 'Kardex',
            // foreignKey is the "join" field
            // the name of the field on a profile that points to its parent user
            localKey: 'REG'
          }
        }
      }
    }
    );
});