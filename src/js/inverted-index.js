'use strict';

/*
 * Index Class
 * It creates an index of the contents of a json file
 * It searches through the created index
 */

var Index = function() {

  // This will contain the indexed JSON files
  this.indexedFiles = {};

  // This will contain the search results
  this.searchResults = {};
};
