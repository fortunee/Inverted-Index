'use strict';

var books = [{
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];

var index = new Index();

describe("Iverted Index Object", function() {


  describe("Read book data", function() {

    beforeEach(function() {
      index.createIndex('books.json', books);
    });

    it("should not be empty", function() {
      expect(fileContents.length).not.toEqual(0);
    });
  });

  describe("Populate Index", function() {

    beforeEach(function() {
      index.createIndex('books.json', books);
    });

    it("should populate the index", function() {
      expect(index.indexedFiles['books.json'].alice).toBeTruthy();
    });

    it("should verify that index is created", function() {
      expect(index.indexedFiles['books.json'].alice).toEqual([0]);
    });

    it("should verify that keys are mapped to the correct docs", function() {
      expect(index.indexedFiles['books.json'].of).toEqual([0, 1]);
    });
  });


  describe("Search index", function() {
    beforeEach(function() {
      index.createIndex('books.json', books);
      index.searchIndex('books.json', "alice in Wonderland");
    });

    it("should return an array of indices of the documents", function() {
      expect(this.searchedResults["books.json"].alice).toEqual([0]);
    });


  });
});
