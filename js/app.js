// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic','checklist-model','chart.js'])


.config(['$httpProvider', function ($httpProvider) {
            
    $httpProvider.defaults.cache = false;
}])

.run(function($ionicPlatform , $rootScope, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

     $rootScope.authStatus = false;
	 //stateChange event
	  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
		  $rootScope.authStatus = toState.authStatus;
		  if($rootScope.authStatus){
			  
			
		  }
    });

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		console.log("URL : "+toState.url);
		if(toState.url=='/dashboard'){
			console.log("match : "+toState.url);
			$timeout(function(){
				angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
			},1000);
		}	
	});

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

//--------------------------------------

 .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signin.html'
      }
    },
	authStatus: false
  })
 .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signup.html',
        controller: 'SignupCtrl',
      }
   },
	authStatus: false
  })
//--------------------------------------


  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
		controller: 'DashCtrl'
      }
     },
	 authStatus: true
  })
  
  .state('app.dashboarde', {
    url: '/dash-estudiantes',
    views: {
      'menuContent': {
        templateUrl: 'templates/dash-estudiantes.html',
		controller: 'DashCtrl'
      }
     },
	 authStatus: true
  })
  

    .state('app.actividade', {
      url: '/actividad-estudiante/:curso',
      views: {
        'menuContent': {
          templateUrl: 'templates/actividad-estudiante.html',
          controller: 'ActeCtrl'
        }
      }
    })
  
    .state('app.actividad', {
      url: '/actividad/:curso',
      views: {
        'menuContent': {
          templateUrl: 'templates/actividad.html',
          controller: 'ActCtrl'
        }
      }
    })

  .state('app.graph', {
      url: '/graph/:curso',
      views: {
        'menuContent': {
          templateUrl: 'templates/graph.html',
          controller: 'graphCtrl'
        }
      }
    })
  
  .state('app.veractividad', {
      url: '/actividad/ver/:actividad',
      views: {
        'menuContent': {
          templateUrl: 'templates/veractividad.html',
          controller: 'veract'
        }
      }
    })
  
  .state('app.creacursos', {
      url: '/crear/cursos',
      views: {
        'menuContent': {
          templateUrl: 'templates/creacurso.html',
          controller: 'CursosCtrl'
        }
      }
    })
  
    .state('app.crearact', {
      url: '/crear/actividad/:curso',
      views: {
        'menuContent': {
          templateUrl: 'templates/creaactividad.html',
          controller: 'ActividadCtrl'
        }
      }
    })

  .state('app.profiles', {
    url: '/profiles',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile-detail.html',
        controller: 'ProfileCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
