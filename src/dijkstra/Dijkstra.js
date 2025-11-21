const _ = require('lodash');

const Algorithm = require('../algorithm/Algorithm');
const Node = require('../node/Node');
const Vector = require('../vector/Vector');
const MinPriorityQueue = require('./MinPriorityQueue');

/**
 * Class representing a Dijkstra's based pathfinding algorithm. Utilizes an internal queue to
 * evaluate every Node a from closest to furthest by magnitude.
 *
 * @class
 * @augments Algorithm
 */
class Dijkstra extends Algorithm {
  /**
   * Constructor for the Dijkstra class.
   *
   * @param {Node} destination The destination node to search for.
   */
  constructor(destination) {
    super(destination);
    // A collection of in-use data, used for recursive implementations.
    this.cache = {
      queue: new MinPriorityQueue(),
      history: []
    };
  }

  /**
   * A static method for finding a path between two points through a directed graph. Will return
   * undefined if no valid path is found.
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
   * An instance method for finding a path between two points through a directed graph. Will return
   * undefined if no valid path is found.
   *
   * @param {Node} current A current Node within a directed graph.
   * @param {Vector[]} solution A partial solution, used for recursive implementations.
   * @param {number} cumulativeCost The cumulative cost from the origin to the current node.
   * @returns {Vector[]|undefined} A path represented with an array of Vectors, or undefined.
   */
  findPath(current, solution = [], cumulativeCost = 0) {
    if (_.isUndefined(current)) { return undefined; }
    if (_.isEqual(current, this.destination)) { return solution; }

    this.cache.history.push(current);

    // Get all unvisited neighbors and add them to queue with calculated priority
    _.filter(
      current.vectors,
      (considered) => !Algorithm.existsInCollection(considered.destination, this.cache.history)
    ).forEach((vector) => {
      // Calculate cumulative cost to reach this neighbor
      const newCost = cumulativeCost + vector.magnitude;

      // Check if this destination is already in queue with a higher cost
      const existingEntry = _.find(
        this.cache.queue.items,
        (item) => _.isEqual(item.node, vector.destination)
      );

      if (!existingEntry || newCost < existingEntry.priority) {
        // Create entry for queue: destination, solution, and cumulative cost
        const entry = {
          node: vector.destination,
          solution: _.concat(solution, vector),
          priority: newCost
        };

        this.cache.queue.insertWithPriority(entry);
      }
    });

    // Get next node from queue
    const next = this.cache.queue.pullHighestPriorityElement();

    if (_.isUndefined(next)) { return undefined; }

    return this.findPath(next.node, next.solution, next.priority);
  }
}

module.exports = Dijkstra;
