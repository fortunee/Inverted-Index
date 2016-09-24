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
  this.tokenize = function(str) {
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

    var that = this;

    fileContents.forEach(function(item, indexNum) {

      var titleTokens = that.tokenize(item.title);
      var textTokens = that.tokenize(item.text);

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

  /*
   * Searches a particular file in the indexedFiles and returns an array of index where a search tokens are found
   * @param{String} fileName - This specifies which you would like to search
   * @param{String} queryString - This is the search query which is what is to be searched
   */
  this.searchFile = function(fileName, queryString) {
    var that = this;

    // Tokenize queryString as our indexed tokens
    var queryTokens = that.tokenize(queryString);

    // Check and compare
    if (that.indexedFiles[fileName]) {
      that.searchResults[fileName] = {};
      queryTokens.forEach(function(qToken) {

        if (that.indexedFiles[fileName][qToken]) {
          that.searchResults[fileName][qToken] = that.indexedFiles[fileName][qToken];
        }

      });
    }

  };

  /*
   * This searches all files
   * @param{String} file - The file name to be searched which could be all files
   * @param{String} queryString - The search query
   */
  this.searchIndex = function(file, queryString) {

    var that = this;

    if (file === "all") {
      Object.keys(that.indexedFiles).forEach(function(fileName) {
        that.searchFile(fileName, queryString);
      });
    } else {
      that.searchFile(file, queryString);
    }
  };
};
