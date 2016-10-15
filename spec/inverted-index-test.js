"use strict";

/** Instance of index Object */
var index = new Index();

/**
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


/**
 * Inverted index test suit
 */
describe("Iverted Index Object", function () {

  /**
   * Test suite to read book data
   */
  describe("Read book data", function () {
    it("should not be empty", function () {
      expect(files).not.toBe(null);
      expect(books.length > 0).toBeTruthy();
    });
  });

  /**
   * Test suite to ensure that a string is properly tokenized
   * and an array of words is returned
   */
  describe("Tokenize words", function () {

    var str = "Hello world, @this is ALL...////";

    it("Should return and array of words passed to it", function () {
      expect(Array.isArray(index.tokenize(str))).toBeTruthy();
    });

    it("Should remove all special characters", function () {
      expect(index.tokenize(str)).toEqual(["hello", "world", "this", "is", "all"]);
    });
  });

  /**
   * Test suite to ensure that words in the Array are unique
   * once they are passed to the uniqueWords method
   */
  describe("Get unique words in the Array", function () {

    var arr = ["hello", "world", "world", "world", "this", "is", "all", "this", "is", "all"];

    it("Should return and array of words passed to it", function () {
      expect(Array.isArray(index.uniqueWords(arr))).toBeTruthy();
    });

    it("Should remove all duplicate words", function () {
      expect(index.uniqueWords(arr)).toEqual(["hello", "world", "this", "is", "all"]);
    });
  });

  /**
   * Test suite to ensure the index is populated
   * when the createIndex method is called with the
   * file name and the JSON documents is passed
   */
  describe("Populate Index", function () {

    beforeEach(function () {
      index.createIndex("books.json", books);
    });

    it("should populate the index", function () {
      expect(index.indexedFiles["books.json"].indexMap.alice).toBeTruthy();
      expect(Array.isArray(index.indexedFiles["books.json"].indexMap.alice)).toBeTruthy();
    });

    it("should verify that index is created", function () {
      expect(index.indexedFiles["books.json"].indexMap.alice)
        .toEqual([0, 1, 2]);
    });

    it("should verify that keys are mapped to the correct docs", function () {
      expect(index.indexedFiles["books.json"].indexMap.of).toEqual([0, 1, 2]);
    });

    it("should verify that documents indices are populated into docIndexNum", function () {
      expect(Array.isArray(index.indexedFiles["books.json"].docIndexNum)).toBeTruthy();
      expect(index.indexedFiles["books.json"].docIndexNum).not.toBe(null);
      expect(index.indexedFiles["books.json"].docIndexNum.length).toEqual(3);
    });

  });

  /**
   * Test suite to ensure the getIndex method returns an object of
   * the correct index mapping
   */
  describe("Get index", function () {

    beforeEach(function () {
      index.createIndex("books.json", books);
    });

    it("should verify that the correct object of index map is returned", function () {
      expect(index.getIndex("books.json")).not.toBe(null);
      expect(typeof index.getIndex("books.json")).toBe("object");
      expect(!Array.isArray(index.getIndex("books.json"))).toBeTruthy();
    });
  });

  /**
   * Test suite to ensure the search index can search all
   * uploaded JSON files or a particular file provide "all"
   * or a file name is passed and returns an array of indices
   * the search query is contained.
   */
  describe("Search index", function () {

    beforeEach(function () {
      index.createIndex("books.json", books);
      index.createIndex("files.json", files);
      index.searchIndex("alice in Wonderland#books.json");
      index.searchIndex("alice in Wonderland#files.json");
      index.searchIndex("alice in Wonderland#all");
    });

    it("should return an array of indices of the documents", function () {
      expect(index.searchResults["books.json"].indexMap.alice).toEqual([0, 1, 2]);
      expect(index.searchResults["books.json"].indexMap.in).toEqual([0]);
      expect(index.searchResults["books.json"].indexMap.wonderland).toEqual([0]);
      expect(index.searchResults["files.json"].indexMap.alice).toEqual([1]);
      expect(Array.isArray(index.searchResults["files.json"].indexMap.alice)).toBeTruthy();
    });

  });

  /**
   * Test suite to ensure the search file can search a particular
   * file provided the file name is passed and return and array of
   * indices the search query is contained.
   */
  describe("Search index of a single JSON file", function () {

    beforeEach(function () {
      index.createIndex("books.json", books);
      index.createIndex("files.json", files);
      index.searchFile("files.json", "appreciated a lot");
    });

    it("should return an array of indices of the documents", function () {
      expect(Array.isArray(index.searchResults["files.json"].indexMap.a)).toBeTruthy();
      expect(index.searchResults["files.json"].indexMap.a).toEqual([1]);
      expect(index.searchResults["books.json"].indexMap.a).toBeFalsy();
    });

  });
});
