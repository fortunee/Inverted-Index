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
    return str.replace(/[.,\/#!$%\^&@\*;:'{}=\-_`~()]/g, "").trim().toLowerCase().split(" ");
  };

  /*
   * FIlters an array in an alphabetical order and get unique words
   * @param{Array} arr - The array to be filtered
   */
  this.uniqueWords = function(arr) {
    return arr.filter(function(item, pos) {
      return arr.indexOf(item) === pos;
    });
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
    indexedFileContents.docIndexNum = fileContents.map(function(item, indexNum) {
      return indexNum;
    });

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

      /* Get unique words from in tokens */
      tokens = this.uniqueWords(tokens);

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

    /* Get unique words from in tokens */
    queryTokens = this.uniqueWords(queryTokens);

    /* Check and compare */
    if (this.indexedFiles[fileName]) {

      /* Initialize the search result the current file with JSON name as the key */
      this.searchResults[fileName] = {
        indexMap: {},
        docIndexNum: this.indexedFiles[fileName].docIndexNum
      };


      queryTokens.forEach(function(queryToken) {
        if (this.indexedFiles[fileName].indexMap[queryToken]) {
          this.searchResults[fileName].indexMap[queryToken] = this.indexedFiles[fileName].indexMap[queryToken];
        } else {
          return alert(queryToken + " is not found anywhere");
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
