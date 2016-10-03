"use strict";

/*
 * Index Class
 * It creates an index of the contents of a json file
 * It searches through the created index
 */
var Index = function() {

  /* This will keep track of the indexed JSON files */
  this.indexedFiles = {};

  /* This will contain the search results */
  this.searchResults = {};

  /*
   * Returns an array of terms/words from the given strings
   * @param{String} str - String to be tokonized
   */
  this.tokenize = function(str) {
    return str.replace(/[.,\/#!$%\^&\*;:'{}=\-_`~()]/g, "").trim().toLowerCase().split(" ");
  };

  /*
   * Creates the index of a JSON file and updates it in the indexedFiles
   * @param{String} fileName - The name of the JSON file that is to be created
   * @param{Array} fileContents - The contents of the JSON file that is to be created
   */
  this.createIndex = function(fileName, fileContents) {

    /* This will contain the indexed file contents */
    var indexedFileContents = {
      indexMap: {}
    };

    /* Gets index number of each document in the JSON object */
    indexedFileContents.documentsId = (function() {
      var documents = [];
      for (var i = 0; i < fileContents.length; i++) {
        documents.push(i);
      }
      return documents;
    })();


    fileContents.forEach(function(item, indexNum) {

      var titleTokens;
      var textTokens;

      /*
       * Check if each document in the JSON file
       * has a title and text.
       */
      if (item.title && item.text) {
        /* Tokenize both title and text */
        titleTokens = this.tokenize(item.title);
        textTokens = this.tokenize(item.text);
      } else {
        return alert("Document " + indexNum + ":  Invalid JSON document. It should have text and title");
      }


      /* Merged array of both titleTokens and textTokens */
      var tokens = titleTokens.concat(textTokens);

      /* FIlter Merged array to order and get unique words */
      tokens = tokens.filter(function(token, pos) {
        return tokens.indexOf(token) === pos;
      });

      /* Set each token as a property indexedFileContents with array value
       * of index number where they appear.
       */
      tokens.forEach(function(token) {
        if (!indexedFileContents.indexMap.hasOwnProperty(token)) {
          indexedFileContents.indexMap[token] = [indexNum];
        } else {
          indexedFileContents.indexMap[token].push(indexNum);
        }
      });
    }.bind(this));

    /* Update the indexed files records */
    this.indexedFiles[fileName] = indexedFileContents;
  };

  /*
   * The getIndex method returns an object of the correct
   * index mapping
   * @param{String} fileName - fileName in which the index map is to be returned
   */
  this.getIndex = function(fileName) {
    return this.indexedFiles[fileName].indexMap;
  };

  /*
   * Searches a particular file in the indexedFiles and returns an
   * array of index where a search tokens are found
   * @param{String} fileName - This specifies which you would like to search
   * @param{String} queryString - This is the search query which is what is to be searched
   */
  this.searchFile = function(fileName, queryString) {

    /* Tokenize queryString as our indexed tokens */
    var queryTokens = this.tokenize(queryString);

    /* Check and compare */
    if (this.indexedFiles[fileName]) {

      /* Initialize the search result the current file with JSON name as the key */
      this.searchResults[fileName] = {
        indexMap: {},
        documentsId: this.indexedFiles[fileName].documentsId
      };


      queryTokens.forEach(function(qToken) {
        if (this.indexedFiles[fileName].indexMap[qToken]) {
          this.searchResults[fileName].indexMap[qToken] = this.indexedFiles[fileName].indexMap[qToken];
        } else {
          return console.log(qToken + " is not found anywhere");
        }

      }.bind(this));
    }

  };

  /*
   * This searches all files
   * @param{String} file - The file name to be searched which could be "all"
   * @param{String} queryString - The search query
   */
  this.searchIndex = function(file, queryString) {

    if (file === "all") {
      Object.keys(this.indexedFiles).forEach(function(fileName) {
        this.searchFile(fileName, queryString);
      }.bind(this));
    } else {
      this.searchFile(file, queryString);
    }
  };
};
