"use strict";window.BS_ENV="localhost:9000"===document.location.host?"dev":"prod",angular.module("bowlApp",["api.app"]).config(["$routeProvider","$locationProvider","$httpProvider",function(a,b,c){delete c.defaults.headers.common["X-Requested-With"],b.html5Mode(!0),a.when("/",{templateUrl:"pages/home/home.html",controller:"MainCtrl"}).when("/people",{templateUrl:"pages/people/index.html",controller:"PeopleIndexController"}).when("/bowls",{templateUrl:"pages/bowls/index.html",controller:"BowlsIndexController"}).otherwise({redirectTo:"/"})}]),angular.module("api.app",[]).service("$api",["$http","$q","$rootScope","$location","$window",function(a,b,c){c.environment=window.BS_ENV,"dev"===c.environment?c.api_host="http://localhost:3000/":"prod"===c.environment&&(c.api_host="placeholder host"),this.call=function(){var d=Array.prototype.slice.call(arguments),e=c.api_host+d.shift().replace(/^\//,""),f="string"==typeof d[0]?d.shift():"GET",g="object"==typeof d[0]?d.shift():{},h="function"==typeof d[0]?d.shift():function(a){return a},i=b.defer(),j=function(a){i.resolve(h(a))};return"GET"===f?a.get(e,{params:g}).success(j):"HEAD"===f?a.head(e,{params:g}).success(j):"DELETE"===f?a.delete(e,{params:g}).success(j):"POST"===f?a.post(e,g,{}).success(j):"PUT"===f&&a.put(e,g,{}).success(j),i.promise},this.get_bowls=function(){return this.call("/bowls")},this.get_people=function(){return this.call("/people")}}]),angular.module("bowlApp").controller("MainCtrl",["$scope","$location","$api",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("bowlApp").controller("NavBarController",["$scope","$location",function(a,b){a.active_tab=function(a){return"people"===a&&/^\/people$/.test(b.path())?"active":"home"===a&&/^\/$/.test(b.path())?"active":"bowls"===a&&/^\/bowls$/.test(b.path())?"active":void 0}}]),angular.module("bowlApp").controller("PeopleIndexController",["$scope","$api",function(a,b){b.get_people().then(function(b){a.people=b}),a.col="right_pick_count",a.reverse=!0,a.sortColumn=function(b){a.col=b,a.reverse=!a.reverse}}]),angular.module("bowlApp").controller("BowlsIndexController",["$scope","$location","$api",function(a,b,c){c.get_bowls().then(function(b){a.bowls=b})}]);