const _ = require('lodash');

const Node = require('../node/Node');
const Vector = require('../vector/Vector');

/**
 * Class representing a pathfinding algorithm.
 * 
 * @class
 */
class Algorithm {
  constructor(destination) {
    // A collection of in-use data, used for recursive implementations.
    this.cache = {};
    // A destination Node to be searched for in a collection.
    this.destination = destination;
  }

  /**
   * A prototype method for finding a path between two points through a directed graph. Will return
   * undefined if not valid path is found.
   *
   * @static
   * @param {Node} origin An origin Node within a directed graph.
   * @param {Node} destination A destination Node within a directed graph.
   * @returns {Vector[]|undefined} A path represented with an array of Vectors, or undefined.
   */
  static findPath(origin, destination) {
    if (!(origin instanceof Node)) {
      throw new Error('Algorithm: origin node must be defined');
    } else if (!(destination instanceof Node)) {
      throw new Error('Algorithm: destination node must be defined');
    }

    return new this(destination).findPath(origin);
  }

  /**
   * A prototype method for evaluating if a directed vector of the same magnitude already exists in
   * the cache.
   *
   * @static
   * @param {object} object An object to search for in a collection.
   * @param {object[]} collection An array of objects in which an object is searched for.
   * @returns {boolean} Returns true if the object exists in the collection, otherwise false.
   */
  static existsInCollection(object, collection) {
    return Boolean(_.find(collection, (evalObject) => _.isEqual(evalObject, object)));
  }

  /**
   * An instance method for finding a path between two points through a directed graph. Will return
   * undefined if not valid path is found.
   *
   * @static
   * @param {Node} _current A current Node within a directed graph.
   * @param {Vector[]} _solution A partial solution used for recursive implementations.
   * @returns {Vector[]|undefined} A path represented with an array of Vectors, or undefined.
   */
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  findPath(_current, _solution) {
    throw new Error('Algorithm: findPath method must be implemented in a sub-class');
  }
}

module.exports = Algorithm;
