'use strict';
var books =
describe("Iverted Index Object", function () {

  describe("Read book data", function () {

    it("should not be empty", function () {
        expect(index.jsonFile.length > 0).toBeTruthy();
    });
  });

  describe("Populate Index", function () {

    beforeEach(function () {
      index.createIndex(docs);
    });

    it("should populate the index", function () {

      index.createIndex(docs);
      expect(index.tokenizedFiles.length === 0).not.toBeTruthy();
    });

    it("should verify that index is created", function () {
      index.createIndex(docs);
      expect(index.tokenizedFiles).toBeTruthy();
    });

    it("should verify that keys are mapped to the correct docs", function () {
      expect();
    });
  });


  describe("Search index", function () {
    it("should return an array of indices of the documents", function () {
      expect();
    });


  });
});
