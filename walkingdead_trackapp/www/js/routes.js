angular.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider



        .state('tabsController.cameraTabDefaultPage', {
            url: '/page2',
            views: {
                'tab1': {
                    templateUrl: 'templates/cameraTabDefaultPage.html',
                    controller: 'cameraTabDefaultPageCtrl'
                }
            }
        })

    .state('tabsController.addTracking', {
        url: '/page3',
        views: {
            'tab2': {
                templateUrl: 'templates/addTracking.html',
                controller: 'addTrackingCtrl'
            }
        }
    })

    .state('tabsController.trackChecking', {
        url: '/page4',
        views: {
            'tab3': {
                templateUrl: 'templates/trackChecking.html',
                controller: 'trackCheckingCtrl'
            }
        }
    })

    .state('tabsController', {
        url: '/page1',
        templateUrl: 'templates/tabsController.html',
        abstract: true
    })

    $urlRouterProvider.otherwise('/page1/page2')



});