
var app = angular.module("markdownOnlineConverterApp", ["angularFileUpload"]);


app.controller("markdownOnlineConverterController", ['$scope', 'FileUploader', '$window', function($scope, FileUploader, $window) {

        var uploader = $scope.uploader = new FileUploader({
            url: '/upload'
        });




        // FILTERS

        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                console.log('syncFilter');
                return this.queue.length <= 1;
            }
        });


        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
            fileItem.upload();
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            //$window.location.href = "/convert/" + response.fileId;
            $scope.convertedUrl = "/convert/" + response.fileId;
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
            $scope.done = true;
        };

        console.info('uploader', uploader);
    }]);




//
// app.config(function($routeProvider) {
//   $routeProvider
//   .when("/", {
//     templateUrl : "form.html",
//     controller: "chatController"
//   })
//   .when("/messages", {
//     templateUrl : "messages.html",
//     controller: "chatController"
//   });
// });
//

//
// app.controller("markdownOnlineConverterController", function ($scope, $http, $interval, $location) {
//     $scope.name = "Miguel";
//     $scope.message = "";
//     $scope.messages = [];
//     $scope.$location = $location;
//
//
//     function updateMessages() {
//         $http.get('/messages').then(function(response) {
//             $scope.messages = response.data;
//         }, function(error) {
//             // do nothing
//         }
//         );
//     }
//
//
//     updateMessages();
//
//     // install timer to update messages every second
//     //$interval(updateMessages, 1000);
//
//
//
//     $scope.deleteMessage = function(id) {
//         $http.delete('/messages/' + id).then(function(response) {
//             $scope.messages = response.data;
//
//             //redirect to messages route
//             $location.url("/messages");
//         }, function(error) {
//             // do nothing
//             console.log(error);
//         }
//         );
//     }
//
//     $scope.sendMessage = function() {
//         var data = {
//             'name': $scope.name,
//             'message': $scope.message,
//         }
//
//         $http.post('/messages', data).then(function(response) {
//             $scope.messages = response.data;
//
//             //redirect to messages route
//             $location.url("/messages");
//         }, function(error) {
//             // do nothing
//             console.log(error);
//         }
//         );
//     }
// });
