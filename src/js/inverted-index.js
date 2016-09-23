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

  /*
   * Creates the index of a JSON file and updates it in the indexedFiles
   * @param{String} fileName - The name of the JSON file that is to be created
   * @param{String} fileContents - The contents of the JSON file that is to be created
   */
  this.createIndex = function(fileName, fileContents) {

    // This will contain the indexed file contents
    var indexedFileContents = {};

    fileContents.forEach(function(item, indexNum) {

      var titleTokens = this.tokonize(item.title);
      var textTokens = this.tokenize(item.text);

      // Merged array of both titleTokens and textTokens
      var tokens = titleTokens.concat(textTokens);

      // FIlter Merged array to order and get unique words
      tokens = tokens.filter(function(token, pos) {
        return tokens.indexOf(token) === pos;
      });

      // Set each token as a property indexedFileContents with array value
      // of index number where they appear.
      tokens.forEach(function(token) {
        if (!indexedFileContents.hasOwnProperty(token)) {
          indexedFileContents[token] = [indexNum];
        } else {
          indexedFileContents[token].push(indexNum);
        }
      });
    });

    // Update the indexed files records
    this.indexedFiles[fileName] = indexedFileContents;
  };

};
