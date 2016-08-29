'use strict';

angular.module('itechApp')
.factory('Kardex', function (store, HDR_Segment, AID_Segment, InstalledPart, ATA2K) {
  var Kardex = store.defineResource({
    name: 'Kardex',
    idAttribute : 'AIN',
    relations: {
      hasOne: {
        HDR_Segment: {
          localKey: 'AIN',
          localField: 'HDR_Segment'
        },
        AID_Segment: {
          localKey: 'AIN',
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
            foreignKey: 'AIN'
          }
        }
      },
      beforeCreate: beforeCreateKardex,
      beforeDestroy: beforeDestroyKardex
    }
    );

  function beforeCreateKardex(Resource, kdx, cb){

    var AIN = kdx.Kardex.AircraftInformation.AID_Segment.AIN;
    var RDT = new Date(kdx.Kardex.HDR_Segment.RDT);

    Date.prototype.subDays=function(d){return this.valueOf()-864E5*d;};
    

    kdx.Kardex.AircraftInformation.AID_Segment.id = AIN;
    var kardex = {
      AIN : AIN,
      WPI : kdx.WPI
    };
    kdx.Kardex.HDR_Segment.id = AIN;


    var createSegments= _.map(Kardex.partList(kdx.Kardex.AircraftInformation.InstallDetails.InstalledPart, AIN, RDT), function(partDetails){     
      return InstalledPart.create(partDetails);
    });
    createSegments.push(HDR_Segment.create(kdx.Kardex.HDR_Segment));
    createSegments.push(AID_Segment.create(kdx.Kardex.AircraftInformation.AID_Segment));



    store.utils.Promise.all(createSegments).then(function(){
      cb(null, kardex);
    }, function(err){console.log(err);});
  };

  function beforeDestroyKardex(Resource, kardex, cb) {

    var AIN = kardex.AIN;
    //kardex = Kardex.loadRelations(Kardex);
    console.log(kardex);
    var del = [InstalledPart.destroyAll({
      where:{
        'AIN':{
          '==' : AIN
        }
      }
    })];
    del.push(HDR_Segment.destroy(AIN));
    del.push(AID_Segment.destroy(AIN));

    

    store.utils.Promise.all(del).then(function(){
      cb(null, kardex);
    })
  };

  Kardex.partList = function(InstallDetails, AIN, RDT){
    var partList = [];
    var index = 1;

    function makePartList(InstalledParts, NHA){
      InstalledParts = InstalledParts.constructor === Array ? InstalledParts : [InstalledParts];

      _(InstalledParts).forEach(function(InstalledPart){

        var part = {
          id : AIN + '/' + InstalledPart.CPI,
          CPI : InstalledPart.CPI,
          MFR : InstalledPart.MFR,
          MPN : InstalledPart.MPN,
          SER : InstalledPart.SER,
          PDT: InstalledPart.PDT,      
          status : InstalledPart.SER ? 'original' : 'none',
          AIN : AIN,
          NHA : AIN + '/' + NHA,
        };
        part.index = index++;

        if (InstalledPart.SER) {
          part.DOI = InstalledPart.DOI;
        } else {}

        if (InstalledPart.hasOwnProperty('ATT_Segment')) {


          part.ATT_Segment = InstalledPart.ATT_Segment;

          if (RDT) {
            _.forEach(Array.isArray(part.ATT_Segment) ? part.ATT_Segment : [part.ATT_Segment], function(att){
              att.ODT = (new Date(part.DOI)).subDays(att.ODT);
            }); 
          } 
        }

        if (InstalledPart.hasOwnProperty('ATN_Segment')) {
          part.ATN_Segment = InstalledPart.ATN_Segment;
        }


        partList.push(part);
        if (InstalledPart.hasOwnProperty('InstalledPart')) {
          part.$$treeLevel = 0 + InstalledPart.CLE -1,
          makePartList(InstalledPart.InstalledPart, InstalledPart.CPI);
        }


      });

      return partList;



    };

    return makePartList(InstallDetails);

  }

  return Kardex;

})
.run(function (Kardex) {})

