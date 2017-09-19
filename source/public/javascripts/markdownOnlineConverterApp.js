
var app = angular.module("markdownOnlineConverterApp", ["angularFileUpload", 'ngSanitize']);


app.controller("markdownOnlineConverterController", ['$scope', 'FileUploader', '$http', '$sce', '$location',
    function($scope, FileUploader, $http, $sce, $location) {

 $scope.upload = {};
 $scope.upload.status = "onStart";


  var uploader = $scope.uploader = new FileUploader({
      url: '/convert'
  });


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
      //console.info('onWhenAddingFileFailed', item, filter, options);
  };
  uploader.onAfterAddingFile = function(fileItem) {
      //console.info('onAfterAddingFile', fileItem);
      fileItem.upload();
  };
  uploader.onAfterAddingAll = function(addedFileItems) {
      //console.info('onAfterAddingAll', addedFileItems);
  };
  uploader.onBeforeUploadItem = function(item) {
      //console.info('onBeforeUploadItem', item);
  };
  uploader.onProgressItem = function(fileItem, progress) {
      //console.info('onProgressItem', fileItem, progress);
      $scope.upload.status = "onProgressItem";
  };
  uploader.onProgressAll = function(progress) {
      //console.info('onProgressAll', progress);
  };
  uploader.onSuccessItem = function(fileItem, response, status, headers) {
      //console.info('onSuccessItem', fileItem, response, status, headers);
  };
  uploader.onErrorItem = function(fileItem, response, status, headers) {
      //console.info('onErrorItem', fileItem, response, status, headers);
  };
  uploader.onCancelItem = function(fileItem, response, status, headers) {
      //console.info('onCancelItem', fileItem, response, status, headers);
  };
  uploader.onCompleteItem = function(fileItem, response, status, headers) {

      //console.info('onCompleteItem', fileItem, response, status, headers);

      $scope.pdf = response.id;
      //$scope.pdf = "data:application/pdf;base64," + btoa(unescape(encodeURIComponent(response)));
      $scope.upload.status = "onCompleteItem";

      //$scope.pdf = "http://www.google.com";
      // convertToPdf(response.fileId, function(err, data) {
      //   //$scope.pdfAsBase64 = "data:application/pdf;base64," + btoa(unescape(encodeURIComponent(data)));
      //   $scope.pdfAsBase64 = "data:application/pdf;base64," + btoa(unescape(encodeURIComponent(data)));
      //
      // });
  };

  uploader.onCompleteAll = function() {
    console.info('onCompleteAll');
    //$scope.upload.status = "onCompleteAll";
  };


  $scope.restart = function() {
    $scope.upload.status = "onStart";
  }

  $scope.goTo = function() {
    //$location.path('/');
    window.location.href = '/';
  }


  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  //console.info('uploader', uploader);


  convertToPdf = function(fileId, callback) {
     $http.get("/convert/" + fileId).then(function(response) {
       console.dir(response);
       callback(null, response.data);
     }, function(error) {
       callback(error, null);
     });
  }
}]);
