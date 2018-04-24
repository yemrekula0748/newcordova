angular.module("ebeveyn_rehberi", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","chart.js","pascalprecht.translate","tmh.dynamicLocale","ebeveyn_rehberi.controllers", "ebeveyn_rehberi.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "TR" ;
		$rootScope.appLogo = "data/images/header/logo.png" ;
		$rootScope.appVersion = "1.1" ;
		$rootScope.headerShrink = false ;

		$ionicPlatform.ready(function() {

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "ebeveyn_rehberi",
				storeName : "ebeveyn_rehberi",
				description : "The offline datastore for Ebeveyn Rehberi app"
			});

			if(window.cordova){
				$rootScope.exist_cordova = true ;
			}else{
				$rootScope.exist_cordova = false ;
			}
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
			// this will create a banner on startup
			//required: cordova plugin add cordova-plugin-admob-free --save
			if (typeof admob !== "undefined"){
				var admobid = {};
				admobid = {
					banner: "ca-app-pub-3940256099942544/6300978111",
					interstitial: "ca-app-pub-3940256099942544/1033173712",
					rewardvideo: ""
				};
				// banner
				admob.banner.config({
					id: admobid.banner,
				});
				admob.banner.prepare();
				$timeout(function(){
					admob.banner.show();
				},1000); 
				// interstitial
				admob.interstitial.config({
					id: admobid.interstitial,
				});
				admob.interstitial.prepare();
				$timeout(function(){
					admob.interstitial.show();
				},1000); 
				// rewardvideo
				admob.rewardvideo.config({
					id: admobid.rewardvideo,
				});
			}


		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("ebeveyn_rehberi.yenidogan_page");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])

	.filter("stripTags", ["$sce", function($sce){
		return function(text) {
			return text.replace(/(<([^>]+)>)/ig,"");
		};
	}])

	.filter("chartData", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if ((indeks !== 0) && (indeks !== 1)){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})

	.filter("chartLabels", function(){
		return function (obj){
			var new_item = [];
			angular.forEach(obj, function(child) {
			var indeks = 0;
			new_item = [];
			angular.forEach(child, function(v,l) {
				if ((indeks !== 0) && (indeks !== 1)) {
					new_item.push(l);
				}
				indeks++;
			});
			});
			return new_item;
		}
	})
	.filter("chartSeries", function(){
		return function (obj) {
			var new_items = [];
			angular.forEach(obj, function(child) {
				var new_item = [];
				var indeks = 0;
				angular.forEach(child, function(v){
						if (indeks === 1){
							new_item.push(v);
						}
						indeks++;
					});
					new_items.push(new_item);
				});
			return new_items;
		}
	})



.config(["$translateProvider", function ($translateProvider){
	$translateProvider.preferredLanguage("en-us");
	$translateProvider.useStaticFilesLoader({
		prefix: "translations/",
		suffix: ".json"
	});
}])


.config(function(tmhDynamicLocaleProvider){
	tmhDynamicLocaleProvider.localeLocationPattern("lib/ionic/js/i18n/angular-locale_{{locale}}.js");
	tmhDynamicLocaleProvider.defaultLocale("en-us");
})


.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?antalyarehber\.site/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("ebeveyn_rehberi",{
		url: "/ebeveyn_rehberi",
			abstract: true,
			templateUrl: "templates/ebeveyn_rehberi-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("ebeveyn_rehberi.about_us", {
		url: "/about_us",
		cache:false,
		views: {
			"ebeveyn_rehberi-side_menus" : {
						templateUrl:"templates/ebeveyn_rehberi-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("ebeveyn_rehberi.about_us_singles", {
		url: "/about_us_singles/:id",
		cache:false,
		views: {
			"ebeveyn_rehberi-side_menus" : {
						templateUrl:"templates/ebeveyn_rehberi-about_us_singles.html",
						controller: "about_us_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("ebeveyn_rehberi.beslenme_page", {
		url: "/beslenme_page",
		cache:false,
		views: {
			"ebeveyn_rehberi-side_menus" : {
						templateUrl:"templates/ebeveyn_rehberi-beslenme_page.html",
						controller: "beslenme_pageCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ebeveyn_rehberi.bookmarks", {
		url: "/bookmarks",
		views: {
			"ebeveyn_rehberi-side_menus" : {
						templateUrl:"templates/ebeveyn_rehberi-bookmarks.html",
						controller: "bookmarksCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ebeveyn_rehberi.dashboard", {
		url: "/dashboard",
		views: {
			"ebeveyn_rehberi-side_menus" : {
						templateUrl:"templates/ebeveyn_rehberi-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ebeveyn_rehberi.emzirme_page", {
		url: "/emzirme_page",
		views: {
			"ebeveyn_rehberi-side_menus" : {
						templateUrl:"templates/ebeveyn_rehberi-emzirme_page.html",
						controller: "emzirme_pageCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ebeveyn_rehberi.gelisim_page", {
		url: "/gelisim_page",
		views: {
			"ebeveyn_rehberi-side_menus" : {
						templateUrl:"templates/ebeveyn_rehberi-gelisim_page.html",
						controller: "gelisim_pageCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ebeveyn_rehberi.men1", {
		url: "/men1",
		views: {
			"ebeveyn_rehberi-side_menus" : {
						templateUrl:"templates/ebeveyn_rehberi-men1.html",
						controller: "men1Ctrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ebeveyn_rehberi.slide_tab_menu", {
		url: "/slide_tab_menu",
		cache:false,
		views: {
			"ebeveyn_rehberi-side_menus" : {
						templateUrl:"templates/ebeveyn_rehberi-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("ebeveyn_rehberi.slide_tab_menu_bookmark", {
		url: "/slide_tab_menu_bookmark",
		views: {
			"ebeveyn_rehberi-side_menus" : {
						templateUrl:"templates/ebeveyn_rehberi-slide_tab_menu_bookmark.html",
						controller: "slide_tab_menu_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("ebeveyn_rehberi.slide_tab_menu_singles", {
		url: "/slide_tab_menu_singles/:id",
		cache:false,
		views: {
			"ebeveyn_rehberi-side_menus" : {
						templateUrl:"templates/ebeveyn_rehberi-slide_tab_menu_singles.html",
						controller: "slide_tab_menu_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("ebeveyn_rehberi.yenidogan_page", {
		url: "/yenidogan_page",
		views: {
			"ebeveyn_rehberi-side_menus" : {
						templateUrl:"templates/ebeveyn_rehberi-yenidogan_page.html",
						controller: "yenidogan_pageCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/ebeveyn_rehberi/yenidogan_page");
});
