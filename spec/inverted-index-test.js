"use strict";

/* Instance of index Object */
var index = new Index();

/*
 * Mock JSON files for the test suites
 */
var books = [{
    "title": "Alice in Wonderland alice",
    "text": "Alice Alice Alice Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An alice unusual alliance of man, elf, dwarf dwarf, wizard and hobbit seek to destroy a powerful ring."
  },

  {
    "title": "King of kings",
    "text": "Jesus Christ is the King of kings and Lord of lords alice"
  }
];


var files = [{
    "title": "Hello people",
    "text": "We Know how people would love it if they're appreciated for everything they do"
  },

  {
    "title": "This is the begining",
    "text": "When the awesome project kicks off a lot amazing things will begin to unveil alice"
  }
];


/*
 * Inverted index test suit
 */
describe("Iverted Index Object", function() {

  /*
   * Test suite to read book data
   */
  describe("Read book data", function() {

    it("should not be empty", function() {
      /* Can't read a file that hasn't be uploaded yet */
    });
  });

  /*
   * Test suite to ensure that a string is properly tokenized
   * and an array of words is returned
   */
  describe("Tokenize words", function() {
    var str = "Hello world, this is ALL";
    it("Should return and array of words passed to it", function() {
      expect(index.tokenize(str)).toEqual(["hello", "world", "this", "is", "all"]);
    });
  });

  /*
   * Test suite to ensure the index is populated
   * when the createIndex method is called with the
   * file name and the JSON documents is passed
   */
  describe("Populate Index", function() {

    beforeEach(function() {
      index.createIndex("books.json", books);
    });

    it("should populate the index", function() {
      expect(index.indexedFiles["books.json"].indexMap.alice).toBeTruthy();
    });

    it("should verify that index is created", function() {
      expect(index.indexedFiles["books.json"].indexMap.alice)
        .toEqual([0, 1, 2]);
    });

    it("should verify that keys are mapped to the correct docs", function() {
      expect(index.indexedFiles["books.json"].indexMap.of).toEqual([0, 1, 2]);
    });
  });

  /*
   * Test suite to ensure the search index can search all
   * uploaded JSON files or a particular file provide "all"
   * or a file name is passed and returns an array of indices
   * the search query is contained.
   */
  describe("Search index", function() {
    beforeEach(function() {
      index.createIndex("books.json", books);
      index.createIndex("files.json", files);
      index.searchIndex("all", "alice in Wonderland");
    });

    it("should return an array of indices of the documents", function() {
      expect(index.searchResults["books.json"].indexMap.alice).toEqual([0, 1, 2]);
      expect(index.searchResults["files.json"].indexMap.alice).toEqual([1]);
    });

  });

  /*
   * Test suite to ensure the search file can search a particular
   * file provided the file name is passed and return and array of
   * indices the search query is contained.
   */
  describe("Search index of a single JSON file", function() {
    beforeEach(function() {
      index.createIndex("books.json", books);
      index.createIndex("files.json", files);
      index.searchFile("files.json", "appreciated a lot");
    });

    it("should return an array of indices of the documents", function() {
      expect(index.searchResults["files.json"].indexMap.a).toEqual([1]);
      expect(index.searchResults["books.json"].indexMap.a).toBeFalsy();
    });

  });
});
