"use strict";

/*
 * Inverted Index angular module
 */
var invertedIndex = angular.module("invertedIndex", [])


/*
 * File upload custom directive which handles the uploaded file
 * @param{String} ngFileUpload - Name of the custom directive
 * @param{Function} callback - callback for custom directive
 */
.directive("fileUpload", function() {
  var directive = {};

  /* Restricts this directive to an HTML attribute */
  directive.restrict = "A";

  /* Require ngModel for input data binding */
  directive.require = "ngModel";

  /* Link to the HTML elememt */
  directive.link = function(scope, element, attributes, ngModel) {

    /* File reader instance for reading the JSON file */
    var reader = new FileReader();
    var upload;
    var fileContents;


    /* Bind a change to the elememt */
    element.bind("change", function(event) {
      upload = event.target.files[0];

      /* Check if uploaded file was JSON */
      if (upload.name.indexOf("json") >= 0) {
        var fileName = upload.name;
        reader.readAsText(upload);
      } else {
        alert("This is not a JSON file. Please try again");
      }
    });

    reader.onload = function(e) {
      fileContents = e.target.result;

      /*
       * Set filecontents to the ngModel in order to be
       * accessible with a scope controller
       */
      ngModel.$setViewValue({
        name: upload.name,
        docs: scope.$eval(reader.result)
      });

      if (attributes.checkFileUpload) {
        scope.$eval(attributes.checkFileUpload);
      }
    };

  };
  return directive;
})

/*
 * Controller for the inverted index
 * @param{String} ivIndexCtrl - Name of the Controller
 * @param{function} function - with Controller dependecies
 */
.controller("ivIndexCtrl", function($scope, $timeout) {

  /*
   * Instance of Index Object and indexedFiles
   */
  var index = new Index();

  /* Keeps track of uploaded files as wells their names */
  $scope.mappedContent = {};
  $scope.docsId = [];

  $scope.verifyFileUpload = function() {

    /* Copies the name and JSON docs to mappedContent */
    $timeout(function() {
      $scope.mappedContent[$scope.file.name] = angular.copy($scope.file);
    });
    console.log($scope.mappedContent);
  };

  /*
   * Create index function
   * @param{String} fileName - Name of current JSON file
   * @param{Array} docs - An array of JSON documents
   */
  $scope.createIndex = function(fileName, docs) {
    index.createIndex(fileName, docs);
    $scope.indexedFiles = index.indexedFiles;
    console.log($scope.indexedFiles);
  };

  /*
   * Search Index function
   * @param{String} file -The file(s) to be searched
   * @param{String} queryString -The search query
   */
  $scope.searchIndex = function(file, queryString) {
    index.searchIndex(file, queryString);
    $scope.searchResults = index.searchResults;
    console.log($scope.searchResults);
  };

});
