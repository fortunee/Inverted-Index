"use strict";

/*
 * Inverted Index angular module
 */
var invertedIndex = angular.module("invertedIndex", [])


/*
 * File upload custom directive which handles the uploaded file
 */
.directive("ngFileUpload", function() {
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

    console.log(attributes);
    // Bind a change to the elememt
    element.bind('change', function(event) {
      uploadedFIle = event.target.files[0];
      console.log(uploadedFIle.name);
    });
  };
});
