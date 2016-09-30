"use strict";

var index = new Index();

describe("Iverted Index Object", function() {


  describe("Read book data", function() {

    it("should not be empty", function() {
      expect(index.indexedFiles.length > 0).not.toBeTruthy();
    });
  });

  describe("Populate Index", function() {

    beforeEach(function() {
      index.createIndex("books.json", books);
    });

    it("should populate the index", function() {
      expect(index.indexedFiles["books.json"].indexMap.alice).toBeTruthy();
    });

    it("should verify that index is created", function() {
      expect(index.indexedFiles["books.json"].indexMap.alice).toEqual([0, 1, 2]);
    });

    it("should verify that keys are mapped to the correct docs", function() {
      expect(index.indexedFiles["books.json"].indexMap.of).toEqual([0, 1, 2]);
    });
  });


  describe("Search index", function() {
    beforeEach(function() {
      index.createIndex("books.json", books);
      index.searchIndex("all", "alice in Wonderland");
      index.searchFile("books.json", "alice in Wonderland");
    });

    it("should return an array of indices of the documents", function() {
      expect(index.searchResults["books.json"].indexMap.alice).toEqual([0, 1, 2]);
    });


  });
});

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
