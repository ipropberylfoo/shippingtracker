angular.module('app.routes', ['ionicUIRouter'])

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
        $stateProvider
            .state('trackDetail', {
                url: '/page2/:id',
                templateUrl: 'templates/trackDetail.html',
                controller: 'trackDetailCtrl'
            })
           /* .state('trackDetail', {
                url: '/page8/:id',
                templateUrl: 'templates/trackDetail.html',
                controller: 'trackDetailCtrl'
            })*/
            /* 
      The IonicUIRouter.js UI-Router Modification is being used for this route.
      To navigate to this route, do NOT use a URL. Instead use one of the following:
        1) Using the ui-sref HTML attribute:
          ui-sref='tabsController.addTrack'
        2) Using $state.go programatically:
          $state.go('tabsController.addTrack');
      This allows your app to figure out which Tab to open this page in on the fly.
      If you're setting a Tabs default page or modifying the .otherwise for your app and
      must use a URL, use one of the following:
        /page1/tab2/page3
        /page1/tab3/page3
    */
            .state('tabsController.addTrack', {
                url: '/page3',
                views: {
                    'tab2': {
                        templateUrl: 'templates/addTrack.html',
                        controller: 'addTrackCtrl'
                    },
                    'tab3': {
                        templateUrl: 'templates/addTrack.html',
                        controller: 'addTrackCtrl'
                    }
                }
            })
            .state('editTrack', {
                url: '/page5/:id',
                templateUrl: 'templates/editTrack.html',
                controller: 'editTrackCtrl'
            })
            .state('tabsController.addCategory', {
                url: '/page6',
                views: {
                    'tab3': {
                        templateUrl: 'templates/addCategory.html',
                        controller: 'addCategoryCtrl'
                    }
                }
            })
            .state('settings', {
                url: '/settings',
                templateUrl: 'templates/settings.html',
                controller: 'settingsCtrl'
            })
            .state('tabsController.trackTrace', {
                url: '/page4',
                views: {
                    'tab3': {
                        templateUrl: 'templates/trackTrace.html',
                        controller: 'trackTraceCtrl'
                    }
                }
            })

            .state('archieved', {
                url: '/page7',
                templateUrl: 'templates/archieved.html',
                controller: 'archievedCtrl'
            })
            .state('tabsController', {
                url: '/page1',
                templateUrl: 'templates/tabsController.html',
                abstract: true
            })
            

        $urlRouterProvider.otherwise('page1/page4')


    });