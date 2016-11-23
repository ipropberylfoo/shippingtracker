angular.module('app.controllers', [])

.controller('trackDetailCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('addTrackCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('editTrackCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('addCategoryCtrl', ['$scope', '$stateParams', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state) {

    $scope.create = function (form) {
        
        $http.post('/smarttrack/folders', form).then(function (response) {
            $state.go('tabsController.trackTrace');
        })
    }

}])

.controller('settingsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

    $scope.$watch('notification', function () {
        $scope.form = {};
        $scope.form.isMuteProcess = $scope.notification;
        $http.put('/smarttrack/setting/0', $scope.form).then(function (response) {
        })
    });    
}])

.controller('trackTraceCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('archievedCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('couriercontroller', ['$scope', '$http', '$q', '$stateParams', '$state',
function ($scope, $http, $q, $stateParams, $state) {

    function FolderDefer() {
        var q = $q.defer();
        $http({
            method: "GET",
            url: "http://beta3.irealtor.api.iproperty.com.my/smarttrack/folders",
            headers: { 'Content-Type': 'application/json' }            
        })
        .success(function (response) {
            q.resolve(response);
            console.log(response);
            console.log("$scope.folder : " + JSON.stringify(response));
        }).error(function (err) {
            q.resolve('');
            console.log(response);
            console.log("error: " + JSON.stringify(err));
        })
    
        return q.promise;
    }

    function ServiceDefer() {
        var q = $q.defer();
        $http({
            method: "GET",
            url: "http://beta3.irealtor.api.iproperty.com.my/smarttrack/couriers",
            headers: { 'Content-Type': 'application/json' }            
        })
        .success(function (response) {
            q.resolve(response);
            console.log("$scope.service : " + JSON.stringify(response));
        }).error(function (err) {
            q.resolve('');
            console.log("error: " + JSON.stringify(err));
        })

        return q.promise;
    }

    $q.all([FolderDefer(), ServiceDefer()]).then(function (result) {
        $scope.folders = result[0];
        $scope.couriers = result[1];

        if ($stateParams != null) {
            if ($stateParams.id > 0) {
                $http({
                    method: "GET",
                    url: "http://beta3.irealtor.api.iproperty.com.my/smarttrack/tracks/" + $stateParams.id,
                    headers: { 'Content-Type': 'application/json' }
                })
               .success(function (response) {
                   $scope.form = form;
                   console.log("$scope.form : " + JSON.stringify(response));
               }).error(function (err) {
                   console.log("error: " + JSON.stringify(err));
               })
            }
        }
    });

    $scope.create = function (form) {
                
        $http.post('/smarttrack/tracks', data).then(function (response) {
            $state.go('tabsController.trackTrace');
        })

    }

    $scope.update = function (form) {        
        
        $http.put('/smarttrack/tracks/' + $stateParams.id, data).then(function (response) {
            $state.go('tabsController.trackTrace');
        })
    }     
}]);
