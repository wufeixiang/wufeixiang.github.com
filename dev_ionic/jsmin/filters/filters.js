'use strict';


angular.module('myFilters', []).filter('getDay', function() {
	return function(input) {
		var tmp = input.split(" ");
		var ret = "" ; 
		if( tmp.length > 2 ){
			ret = tmp[0];
		}
		return ret;
	};
}).filter('getRoomType', function() {
	return function(input) {
		input = "" + input ; 
		var roomtypes = {
			"65":"主卧房", 
			"66":"客卧房", 
			"67":"儿童房", 
			"68":"书房", 
			"69":"客餐厅", 
			"70":"衣帽间", 
			"71":"厨房", 
			"72":"卫生间", 
			"73":"其他"
		};
		return roomtypes[input];
	};
}).filter('getRoomTypeEn', function() {
	return function(input) {
		input = "" + input ; 
		var roomtypes = {
			"65":"Main BedRoot", 
			"66":"Guest BedRoom", 
			"67":"Child Room", 
			"68":"Study Room", 
			"69":"Restaurant", 
			"70":"Cloakroom", 
			"71":"Kitchen", 
			"72":"Wash Room", 
			"73":"Others"
		};
		return roomtypes[input];
	};
}); 