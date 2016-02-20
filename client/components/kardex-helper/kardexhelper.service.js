'use strict';

angular.module('itechApp')
.service('kardexhelper', function () {


	return {
		partList(InstallDetails){
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
	};

});
