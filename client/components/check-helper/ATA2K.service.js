'use strict';

angular.module('itechApp')
.service('ATA2K', function () {

 var definition = {
  HDR_Segment : {
   CHG : {
    desc : 'Change Code',
    type : 'string',
    mandatory : false,
    value : ['A', 'D', 'N', 'R', 'T']
  },
  ROC : {
    desc : 'Reporting Organisation Code',
    type : 'string',
    mandatory : false
  },
  RDT : {
    desc : 'Reporting Period Start Date',
    type : 'string',
    mandatory : false
  },
  RSD : {
    desc : 'Reporting Period End Date',
    type : 'string',
    mandatory : false
  },
  OPR : {
    desc : 'Operator Code',
    type : 'string',
    mandatory : false
  },
  RON : {
    desc : 'Reporting Organisation Name',
    type : 'string',
    mandatory : false
  },
  WHO : {
    desc : 'Operating Name',
    type : 'string',
    mandatory : false
  }
},
AID_Segment : {
 MFR : {
  desc : 'Manufactuer Code',
  type : 'string',
  mandatory : false
},
AMC : {
  desc : 'Aircraft Model Identifier',
  type : 'string',
  mandatory : false
},
AIN : {
  desc : 'Aircraft Identification Number',
  type : 'string',
  mandatory : true
},
REG : {
  desc : 'Aircraft Fully Qualified Registration Number',
  type : 'string',
  mandatory : false
}
},
WPI_Segment : {
 WPI : {
  desc : 'Work Package Identifier',
  type : '',
  mandatory : true
},
WOD : {
  desc : 'Work Order Start Date',
  type : 'date',
  mandatory : true
},
WOE : {
  desc : 'Work Order End Date',
  type : 'date',
  mandatory : false
},
MCI : {
  desc : 'Maintenance Check Identifier',
  type : '',
  mandatory : false
},
MCV : {
  desc : 'Maintenance Check Interval',
  type : '',
  mandatory : false
},
CTH : {
  desc : 'Aircraft Cumulative Total Flight Hours',
  type : '',
  mandatory : false
},
CTY : {
  desc : 'Aircraft Cumulative Total Flight Cycles',
  type : '',
  mandatory : false
}
},
HCD_Segment : {
 HRI : {
  desc : 'Scheduled Maintenance Identifier',
  type : 'string',
  mandatory : false
},
OST : {
  desc : 'Operator Specific Task Indicator',
  type : 'boolean',
  mandatory : true
},
TED : {
  desc : 'TaskEnd Date',
  type : 'date',
  mandatory : true
},
MIR : {
  desc : 'Maintenance Findings Indicator',
  type : 'boolean',
  mandatory : true
},
MII : {
  desc : "Manufacturer's Inspection Identifier",
  type : 'string',
  mandatory : true
},
MTD : {
  desc : 'Manufacturer Task Description ',
  type : 'string',
  mandatory : true
},
OII : {
  desc : 'Operator Inspection Identifier',
  type : 'string',
  mandatory : true
},
OTD : {
  desc : 'Operator Task Description',
  type : 'string',
  mandatory : true
},
OMN : {
  desc : 'Operator Main Task Interval',
  type : '',
  mandatory : false
},
ATA : {
  desc : 'ATA Standard Number',
  type : 'int',
  mandatory : false
},
CTH : {
  desc : 'Aircraft Cumulative Total Flight Hours',
  type : '',
  mandatory : false
},
CTY : {
  desc : 'Aircraft Cumulative Total Flight Cycles',
  type : '',
  mandatory : false
},
MNT : {
  desc : 'Maintenance Action Text',
  type : 'string',
  mandatory : false
},
REM : {
  desc : 'Commentaire',
  type : 'string',
  mandatory : true
}
},
NRF_Segment : {
 NSI : {
  desc : 'Non-Routine Tracking Number ',
  type : 'string',
  mandatory : true,
  maxLength : 6
},
MNT : {
  desc : 'Maintenance Action Text',
  type : 'string',
  mandatory : false
},
TSI : {
  desc : 'Task Out-Of-Scope Findings Indicator',
  type : 'boolean',
  mandatory : false,
},
COL : {
  desc : 'Corrosion Level Code',
  type : 'int',
  mandatory : false,
  value : [0, 1, 2, 3, 9]
},
COV : {
  desc : 'Corrosion Temporary Protection System Visible Indicator',
  type : 'string',
  mandatory : false,
  value : ['D', 'N', 'Y']
},
COT : {
  desc : 'Corrosion Temporary Protection System Indicator',
  type : 'string',
  mandatory : false,
  value : ['D', 'N', 'Y']
},
CBO : {
  desc : 'Cumulative Blend-Out CPCP Indicator',
  type : 'string',
  mandatory : false,
  value : ['D', 'N', 'Y']
},
NCP : {
  desc : 'Non-Typical Corrosion CPCP Indicator',
  type : 'string',
  mandatory : false,
  value : ['D', 'N', 'Y']
},
HRI : {
  desc : 'Scheduled Maintenance Identifier',
  type : 'string',
  mandatory : false
},
DTA : {
  desc : 'Discrepancy ATA Standard Number',
  type : 'string',
  mandatory : false
},
APF : {
  desc : 'Findings Type Code ',
  type : 'string',
  mandatory : true,
  value : ['RE', 'TS']
},
FDT : {
  desc : 'Findings Description Text',
  type : 'string',
  mandatory : false
},
MOT : {
  desc : 'Task Out-Of-Scope Findings Text',
  type : 'string',
  mandatory : false
}
},
AWR_Segment : {
 MNT : {
  desc : 'Maintenance Action Text ',
  type : 'string',
  mandatory : true
},
TWI : {
  desc : 'Additional Work Tracking Number',
  type : 'string',
  mandatory : false
},
MTD : {
  desc : 'Manufacturer Task Identifier Description',
  type : 'string',
  mandatory : false
},
ATA : {
  desc : 'ATA Standard Number',
  type : 'string',
  mandatory : false
},
FDT : {
  desc : 'Findings Description Text',
  type : 'string',
  mandatory : true
},
REM : {
  desc : 'Comments',
  type : 'string',
  mandatory : true
}
},
PAR_Segment : {
 RED : {
  desc : 'Part Removal Date',
  type : 'date',
  mandatory : true
},
MFR : {
  desc : 'Manufacturer Code',
  type : 'string',
  mandatory : false
},
MPN : {
  desc : 'Manufacturer Full Part Number',
  type : 'string',
  mandatory : true
},
SER : {
  desc : 'Part Serial Number',
  type : 'string',
  mandatory : true
},
DOI : {
  desc : 'Installation Date',
  type : 'date',
  mandatory : true
},
PNR : {
  desc : 'Part Number ',
  type : 'string',
  mandatory : false
},
PDT : {
  desc : 'Part Description',
  type : 'string',
  mandatory : false
},
CPI : {
  desc : 'Component Position Code',
  type : 'string',
  mandatory : true
},
CPT : {
  desc : 'Component Position Text',
  type : 'string',
  mandatory : false
},
RMT : {
  desc : 'Removal Reason Text',
  type : 'string',
  mandatory : true
},
ASN : {
  desc : 'Airline Stock Number',
  type : 'string',
  mandatory : false
}
},
ATT_Segment : {
 TRF : {
  desc : 'Time/Cycle Reference Code',
  type : 'string',
  mandatory : true,
  value : ['N', 'O', 'Y', 'X']
},
OTT : {
  desc : 'Operating Time',
  type : 'number',
  mandatory : true
},
OPC : {
  desc : 'Operating Cycle Count',
  type : 'number',
  mandatory : true
},
ODT : {
  desc : 'Operating Days',
  type : 'number',
  mandatory : true
}
},
ATN_Segment : {
 TRF : {
  desc : 'Time/Cycle Reference Code',
  type : 'string',
  mandatory : true,
  value : ['N', 'O', 'Y', 'X']
},
NSC : {
  desc : 'Non-Standard Code',
  type : 'string',
  mandatory : true
},
OTN : {
  desc : 'Operating Time Non-Standard',
  type : 'string',
  mandatory : true
}
},
IPT_Segment : {
 DOI : {
  desc : 'Installation Date',
  type : 'date',
  mandatory : true
},
MFR : {
  desc : 'Manufacturer Code',
  type : 'string',
  mandatory : false
},
MPN : {
  desc : 'Manufacturer Full Part Number',
  type : 'string',
  mandatory : true
},
SER : {
  desc : 'Part Serial Number ',
  type : 'string',
  mandatory : true
},
PNR : {
  desc : 'Part Number',
  type : 'string',
  mandatory : false
},
PDT : {
  desc : 'Part Description',
  type : 'string',
  mandatory : true
},
CPI : {
  desc : 'Component Position Code',
  type : 'string',
  mandatory : true
},
CPT : {
  desc : 'Component Position Text',
  type : 'string',
  mandatory : false
}
},
AIT_Segment : {
  TRF : {
    desc : 'Time/Cycle Reference Code',
    type : 'string',
    mandatory : true,
    value : ['N', 'O', 'Y', 'X']
  },
  OTT : {
    desc : 'Operating Time',
    type : 'number',
    mandatory : true
  },
  OPC : {
    desc : 'Operating Cycle Count',
    type : 'number',
    mandatory : true
  },
  ODT : {
    desc : 'Operating Days',
    type : 'number',
    mandatory : true
  }
}
};



_.forIn(definition, function(value, key) {_.assign(definition, value);});

function toJson(segmentName, segment) {
  return _.chain(segment)
  .pick(_.keys(definition[segmentName]))
  .mapValues(function(value, key){
    return definition[segmentName][key].type==='date'? formatDate(value) : value;
  })
  .value();
}

function formatDate(date) {
  var d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

return {
  definition : definition,
  toJson : toJson,
}
});
