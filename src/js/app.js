"use strict";

/**
 * Inverted Index angular module
 */
var invertedIndex = angular.module("invertedIndex", [])


/**
 * File upload custom directive which reads the uploaded file
 * and passes it to the invertedIndex controller
 * @param{String} ngFileUpload - Name of the custom directive
 * @param{Function}
 */
.directive("fileUpload", function () {
  var directive = {};

  /** Restricts this directive to an HTML attribute */
  directive.restrict = "A";

  /** Require ngModel for input data binding */
  directive.require = "ngModel";

  /** Link to the HTML elememt */
  directive.link = function (scope, element, attributes, ngModel) {

    /** File reader instance for reading the JSON file */
    var reader = new FileReader();
    var upload;
    var fileContents;


    /** Bind a change to the elememt */
    element.bind("change", function (event) {
      upload = event.target.files[0];

      /** Check if uploaded file is a JSON */
      if (upload.name.match(/\.json$/g)) {
        var fileName = upload.name;
        reader.readAsText(upload);
      } else {
        alert("This is not a JSON file. Please try again");
      }
    });

    reader.onload = function (e) {
      fileContents = e.target.result;

      /**
       * Set filecontents to the ngModel in order to be
       * accessible within the scope controller
       */
      ngModel.$setViewValue({
        name: upload.name,
        docs: scope.$eval(fileContents)
      });

      if (attributes.checkFileUpload) {
        scope.$eval(attributes.checkFileUpload);
      }
    };

  };
  return directive;
})

/**
 * Controller for the inverted index
 * @param{String} invertedIndexCtrl - Name of the Controller
 * @param{function} function - with Controller dependecies
 */
.controller("invertedIndexCtrl", function ($scope, $timeout) {

  /**
   * Instance of Index Object
   */
  var index = new Index();

  /** Keep track of uploaded files */
  $scope.jsonFileObj = {};

  $scope.saveFileObj = function () {

    /** Copies the file name and docs into jsonFileObj */
    $timeout(function() {
      $scope.jsonFileObj[$scope.file.name] = angular.copy($scope.file);
    });

  };

  /**
   * Create index scope function
   * @param{String} fileName - Name of current JSON file
   * @param{Array} docs - An array of JSON documents
   */
  $scope.createIndex = function (fileName, docs) {
    index.createIndex(fileName, docs);
    $scope.indexedFiles = index.indexedFiles;
  };

  /**
   * Search Index scope function
   * @param{String} file -The file(s) to be searched
   * @param{String} queryString -The search query
   */
  $scope.searchIndex = function (file, queryString) {
    index.searchIndex(file, queryString);
    $scope.searchResults = index.searchResults;
  };

});
