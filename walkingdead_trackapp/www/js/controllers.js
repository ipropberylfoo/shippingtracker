﻿function toFormData(obj) {
    var data = "";

    for (var prop in obj) {
        data = data + prop + '=' + obj[prop] + '&';
    }

    return data;
}



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

.controller('settingsCtrl', ['$scope', '$stateParams', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http) {

    $scope.$watch('notification', function () {
        $http({
            method: "POST",
            url: "http://beta3.irealtor.api.iproperty.com.my/smarttrack/setting/0",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
            data: "isMuteProcess=" + $scope.notification
        });
    });    
}])

.controller('trackTraceCtrl', ['$scope', '$stateParams', '$state', '$q', '$http', '$filter', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $q, $http, $filter) {
    alert('refresh');
    $scope.categories = [];
    $scope.folders = [];
    $scope.tracklist = [];
        //[{ "Id": "1", "Name": "LeeYin", "CompanyId": "1", "TrackNo": "E1234567890MY", "IsMuteProcess": "0", "TrackStatus": "Delivering", "FolderId": 1 },
        //    { "Id": "2", "Name": "Kok Eng", "CompanyId": "1", "TrackNo": "E1234567890SG", "IsMuteProcess": "0", "TrackStatus": "Delivered", "FolderId": 1 },
        //    { "Id": "3", "Name": "Ken Ken", "CompanyId": "2", "TrackNo": "E1234567890ID", "IsMuteProcess": "0", "TrackStatus": "Delivering", "FolderId": 2 },
        //    { "Id": "4", "Name": "Beryl Foo", "CompanyId": "1", "TrackNo": "E1234567890FR", "IsMuteProcess": "0", "TrackStatus": "Delivering", "FolderId": 3 }
        //];
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
            console.log("error folder: " + JSON.stringify(err));
        })

        return q.promise;
    }

    function TrackDefer() {
        var q = $q.defer();
        $http({
            method: "GET",
            url: "http://beta3.irealtor.api.iproperty.com.my/smarttrack/tracks",
            headers: { 'Content-Type': 'application/json' }
        })
        .success(function (response) {
            q.resolve(response);
            console.log("$scope.tracklist : " + JSON.stringify(response));
        }).error(function (err) {
            q.resolve('');
            console.log("error tracklist: " + JSON.stringify(err));
        })

        return q.promise;
    }
    $q.all([FolderDefer(), TrackDefer()]).then(function (result) {
        $scope.folders = result[0];
        $scope.tracklist = result[1];

        for (var i = 0; i < $scope.folders.length; i++) {
            var folderList = $filter('filter')($scope.tracklist, { FolderId: $scope.folders[i].Id }, true)

            if (folderList != null) {
                $scope.categories[i] = {
                    name: $scope.folders[i].Name,
                    items: []
                };
                for (var j = 0; j < folderList.length; j++) {
                    $scope.categories[i].items.push(folderList[j]);
                    console.log(JSON.stringify(folderList[j]));
                }
            }

        }
    });

    $scope.delete = function (id) {
        var track = $filter('filter')($scope.tracklist, { Id: id }, true)
        //track[0].
        //$http.post('/smarttrack/tracks', data).then(function (response) {
        //    $state.go('tabsController.trackTrace');
        //})

    }
    $scope.mute = function (id) {
       // alert('come to mute');
        var track = $filter('filter')($scope.tracklist, { Id: id }, true)
      //  alert(track[0].IsMuteAll);
        track[0].IsMuteAll = 1; // !(track[0].IsMuteAll);
        track[0].Remark = 'update here';
      //  alert(track[0].IsMuteAll);
      //  alert(track[0].Remark);
       // alert(id);
        $http({
            method: "POST",
            url: "http://beta3.irealtor.api.iproperty.com.my/smarttrack/tracks/" + id,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
            data: toFormData(track[0])
        }).success(function (response) {
            alert('success');
        }).error(function (err) {
            alert('error');
        });
        $state.go('tabsController.trackTrace');
    }

   

    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function (group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function (group) {
        return $scope.shownGroup === group;
    };

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

        $http({
            method: "POST",
            url: "http://beta3.irealtor.api.iproperty.com.my/smarttrack/tracks",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
            data: toFormData(form)
        });

        $state.go('tabsController.trackTrace');
    }

    $scope.update = function (form) {        

        $http({
            method: "POST",
            url: 'http://beta3.irealtor.api.iproperty.com.my/smarttrack/tracks/' + $stateParams.id,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
            data: toFormData(form)
        });

        $state.go('tabsController.trackTrace');        
    }     
}]);
