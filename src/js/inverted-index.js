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

  /*
   * Returns an array of terms from the given strings
   * @param{String} str - String to be tokonized
   */
  this.tokonize = function(str) {
    return str.replace(/[.,\/#!$%\^&\*;:'{}=\-_`~()]/g, '').trim().toLowerCase().split(' ');
  };
};
