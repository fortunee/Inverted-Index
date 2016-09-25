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

  // Restricts this directive to an HTML attribute
  directive.restrict = "A";

  // Require ngModel for input data binding
  directive.require = "ngModel";

  // Link to the HTML elememt
  directive.link = function(scope, element, attributes, ngModel) {

    // File reader instance for reading the JSON file
    var reader = new FileReader();
    var uploadedFIle;
    var fileContents;


    // Bind a change to the elememt
    element.bind('change', function(event) {
      uploadedFIle = event.target.files[0];
      console.log(uploadedFIle.name);

      // Check if uploaded file was JSON
      if (uploadedFIle.name.indexOf('json') !== -1) {
        reader.readAsText(uploadedFIle);
      } else {
        console.log("This is not a JSON file");
      }
    });

    reader.onload = function(e) {
      console.log(e.target.results);
    };
  };
  return directive;
})

/*
 * Controller for the inverted index
 * @param{String} ivIndexCtrl - Name of the Controller
 * @param{function} callback - with Controller dependecies
 */
.controller("ivIndexCtrl", function($scope) {
  $scope.name = "fortune iyke";
});
