const _ = require('lodash');

const Algorithm = require('../algorithm/Algorithm');
const Node = require('../node/Node');
const Vector = require('../vector/Vector');

class PriorityNode extends Node {
  constructor(node, priority) {
    super(node.x, node.y, node.key);

    this.vectors = node.vectors;
    this.priority = priority;
    this.solution = [];
  }
};

class MinPriorityQueue extends Array {
  /**
   * Check whether the queue has no elements.
   */
  get isEmpty() {
    return Boolean(this.length);
  }

  /**
   * Returns the highest-priority element but does not modify the queue
   */
  get peek() {
    return _.head(this);
  }

  /**
   * Add an element to the queue with an associated priority.
   */
  insertWithPriority(element) {
    this.push(element)
    return _.sortBy(this, 'priority');
  }

  /**
   * Remove the element from the queue that has the highest priority, and return it.
   */
  pullHighestPriorityElement() {
    return this.shift();
  }
}

/**
 * Class representing a Dijkstra's based pathfinding algorithm. Utilizes an internal queue to
 * evaluate every Node a from closest to furthest by magnitude.
 *
 * @example
 * 
 * @class
 * @augments Algorithm
 */
class Dijkstra extends Algorithm {
  constructor(destination) {
    super(destination);
    // A collection of in-use data, used for recursive implementations.
    this.cache = {
      queue: MinPriorityQueue,
      history: [],
    };
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

    return new this(destination).findPath(new PriorityNode(origin, 0));
  }
  
  /**
   * 1. if current priority does not exist, add set it to 0
   * 2. add current node (A) to history to mark as seen
   * 3. add all that node's vectors that have destinations not in history to the queue,
   *  by a adding their magnitude to their parent's magnitue
   *  {node, priority: node.magnitude + A.priority: solution: [...solution, vector]) }
   * 
   * if destination node is already in queue, change its priority to min and resort queue
   * 
   * recurse with first node in queue
   */

  /**
   * An instance method for finding a path between two points through a directed graph. Will return
   * undefined if no valid path is found.
   *
   * @param {PriorityNode} current A current PriorityNode within a directed graph.
   * @returns {Vector[]|undefined} A path represented with an array of Vectors, or undefined.
   */
  findPath(current) {
    if (_.isUndefined(current)) { return undefined; }
    if (_.isEqual(current, this.destination)) { return this.solution; }

    this.cache.history.push(current.node);

    new PriorityNode(origin, 0)

    this.cache.queue.insertWithPriority

    _.filter(current.vectors, (considered) => !Algorithm
      .existsInCollection(considered.destination, this.cache.history)
    ),










    if (_.isUndefined(current)) { return undefined; }
    if (_.isEqual(current, this.destination)) { return solution; }
    
    this.cache.history.push(current);

    this.cache.queue.add_with_priority(..._.map(
      _.filter(current.vectors, (considered) => !Algorithm
        .existsInCollection(considered.destination, this.cache.history)
      ),
      (enqueued) => [enqueued.destination, _.concat(solution, enqueued)]
    ), 0);

    return this.findPath(...[this.cache.queue.shift()].flat());
  }
}

module.exports = Dijkstra;
