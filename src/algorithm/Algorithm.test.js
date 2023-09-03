const Node = require('../node/Node');
const Vector = require('../vector/Vector');

const Algorithm = require('./Algorithm');

describe('Algorithm', () => {
  let origin, destination;

  beforeEach(() => {
    origin = new Node(0, 0);
    destination = new Node(0, 1);
    origin.createBidirectionalVector(destination, 1);
  });

  test('extends Object', () => {
    expect(new Algorithm()).toBeInstanceOf(Object);
  });

  describe('static', () => {
    describe('findPath', () => {
      test('throws an error when origin is not a Node', () => {
        expect(() => { Algorithm.findPath('Node', destination); })
          .toThrowError('Algorithm: origin node must be defined');
      });

      test('throws an error when destination is not a Node', () => {
        expect(() => { Algorithm.findPath(origin, 'Node'); })
          .toThrowError('Algorithm: destination node must be defined');
      });

      test('uses a new instance of Algorithm and calls findPath on it', () => {
        expect(() => { Algorithm.findPath(origin, destination); })
          .toThrowError('Algorithm: findPath method must be implemented in a sub-class');
      });
    });

    describe('existsInCollection', () => {
      test('returns true when the object exists in the collection', () => {
        expect(Algorithm.existsInCollection('o', 'Hello')).toBe(true);
        expect(Algorithm.existsInCollection(origin, [origin, destination])).toBe(true);
        expect(Algorithm.existsInCollection(new Vector(origin, destination, 1), [
          new Vector(destination, destination, 1),
          new Vector(origin, origin, 1),
          new Vector(origin, destination, 1)
        ])).toBe(true);
      });

      test('returns false when the object does not exist in the collection', () => {
        expect(Algorithm.existsInCollection('a', 'Hello')).toBe(false);
        expect(Algorithm.existsInCollection(origin, [destination, destination])).toBe(false);
        expect(Algorithm.existsInCollection(new Vector(origin, destination, 1), [
          new Vector(destination, origin, 1),
          new Vector(origin, destination, 0)
        ])).toBe(false);
      });
    });
  });

  describe('findPath', () => {
    test('throws an error', () => {
      expect(() => { new Algorithm().findPath(); })
        .toThrowError('Algorithm: findPath method must be implemented in a sub-class');
      expect(() => { new Algorithm().findPath(undefined, undefined); })
        .toThrowError('Algorithm: findPath method must be implemented in a sub-class');
      expect(() => { new Algorithm().findPath(origin, undefined); })
        .toThrowError('Algorithm: findPath method must be implemented in a sub-class');
      expect(() => { new Algorithm().findPath(undefined, destination); })
        .toThrowError('Algorithm: findPath method must be implemented in a sub-class');
      expect(() => { new Algorithm().findPath(origin, destination); })
        .toThrowError('Algorithm: findPath method must be implemented in a sub-class');
    });
  });
});
