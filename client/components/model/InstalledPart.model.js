'use strict';

angular.module('itechApp')
.factory('InstalledPart', function (store, AID_Segment, Reference) {
  var InstalledPart = store.defineResource({
    name: 'InstalledPart',
    relations: {
      belongsTo: {
        Kardex: {
            // localField is for linking relations
            // user.profile -> profile of the user
            localField: 'Kardex',
            // foreignKey is the "join" field
            // the name of the field on a profile that points to its parent user
            localKey: 'AIN'
          }
        },
        hasOne: {
          PAR_Segment: {
            localKey: 'id',
            localField: 'PAR_Segment'
          },
          IPT_Segment: {
            localKey: 'id',
            localField: 'IPT_Segment'
          },
          InstalledPart: {
            localKey: 'NHA',
            localField: 'higherPart'
          },               
        },
        hasMany: {
          InstalledPart: {
            foreignKey: 'NHA',
            localField: 'lowerPart'
          }
        }
      },
      computed: {
        // object passed to Object.defineProperty
        ownStatus: {
          // default is false
          enumerable: true,
          get: function () {
            if (this.SER==="") {
              if (typeof this.IPT_Segment === 'undefined') {
                return 'none'
              } else {
                return 'installed'
              }
            } else {
              if (typeof this.PAR_Segment === 'undefined') {
                return 'original';
              } else {
                if (typeof this.IPT_Segment === 'undefined') {
                  return 'removed';
                } else {
                  return 'replaced';
                } 
              }
            }

          },
        },
        status: {
          // default is false
          enumerable: true,
          get: function () {
              
            function upperStatus(part){
              switch (part.ownStatus){
                case 'original':
                  return part.higherPart? upperStatus(part.higherPart) : 'original';
                case 'removed':
                  return 'removed';
                case 'none':
                  return 'none';
                case 'installed':
                  return 'installed';
                case 'replaced':
                  return 'replaced'; 
              }
            }

            return upperStatus(this); 
          },
        }
      },
      methods: {
        initRemoval: function(HRI){
         var removal = {
          HRI : HRI,
          CPI : this.CPI,
          SER : this.SER,
          MPN : this.MPN,
          MFR : this.MFR,
          PDT : this.PDT,
          DOI : this.DOI,
          RED : null,
          RMT : null,
          position : this.id
        }

        if (this.hasOwnProperty('ATT_Segment')) {
          removal.ATT_Segment = this.ATT_Segment;
        }

        if (this.hasOwnProperty('ATN_Segment')) {
          removal.ATN_Segment = this.ATN_Segment;
        }

        return removal;

      },
      initInstallation: function(HRI){
      	var installedPart = this;

      	return {
          HRI : HRI,
          CPI : installedPart.CPI,
          position : installedPart.id,
          MMPN : installedPart.MPN,
          MMFR : installedPart.MFR,
          MPDT : installedPart.PDT,
        }
      },
      getReference: function(){
        var part = this;

        var ref = [{
          MPN : this.MPN,
          MFR : this.MFR,
          PDT : this.PDT,
          IAT_Segment : Reference.initATT_Segment,
          initATN_Segment : initATN_Segment
        }];

        function initATN_Segment(){
          return part.hasOwnProperty('ATN_Segment') ? _.forEach(part.ATN_Segment, function(atn){ atn.OTN= null;}) : [];
        }

        return ref;
      }      	
    },
    beforeCreate: beforeCreateInstalledPart,
  }
  );

  InstalledPart.getReference = function(AIN, CPI){
    return store.find('InstalledPart', AIN+'/'+CPI).then(function(part){
      return part.getReference();
    }, function(err){console.log(err);});

  };

  return InstalledPart;
})
.run(function (InstalledPart) {});;


function beforeCreateInstalledPart(Resource, part, cb) {
  //part.status = part.SER ? 'original' : 'none';
  cb(null, part);
}