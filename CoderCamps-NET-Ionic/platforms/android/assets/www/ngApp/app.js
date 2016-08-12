var MyApp;
(function (MyApp) {
    angular.module('MyApp', ['ngCordova', 'ionic', 'ui.router'])
        .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
        .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // Define routes
        $stateProvider
            .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: '/ngApp/views/tabs.html'
        })
            .state('tab.dash', {
            url: '/dash',
            views: {
                'tab-dash': {
                    templateUrl: '/ngApp/views/tab-dash.html',
                    controller: MyApp.Controllers.DashController,
                    controllerAs: 'controller'
                }
            }
        })
            .state('tab.goliberty', {
            url: '/goliberty',
            views: {
                'tab-goliberty': {
                    templateUrl: '/ngApp/views/tab-goliberty.html',
                    controller: MyApp.Controllers.GoLibertyController,
                    controllerAs: 'controller'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');
    });
})(MyApp || (MyApp = {}));
//# sourceMappingURL=app.js.map