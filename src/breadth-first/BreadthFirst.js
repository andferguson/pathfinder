const _ = require('lodash');

const Algorithm = require('../algorithm/Algorithm');
const Node = require('../node/Node');
const Vector = require('../vector/Vector');

/**
 * Class representing a breadth-first search pathfinding algorithm. Utilizes an internal queue to
 * evaluate every Node a from shallowest to deepest.
 *
 * NOTE: This algorithm does not have any considerations for {@link Vector#magnitude}.
 *
 * @class
 * @augments Algorithm
 * @example
 *                  ┌─┐
 *              ┌───┤A├───┐
 *              │   └┬┘   │
 *              │    │    │
 *             ┌▼┐  ┌▼┐  ┌▼┐
 *         ┌───┤B│  │C│  │D├───┐
 *         │   └┬┘  └─┘  └┬┘   │
 *         │    │         │    │
 *        ┌▼┐  ┌▼┐       ┌▼┐  ┌▼┐
 *    ┌───┤E│  │F├───┐   │G│  │H├───┐
 *    │   └┬┘  └┬┘   │   └┬┘  └┬┘   │
 *    │    │    │    │    │    │    │
 *   ┌▼┐  ┌▼┐  ┌▼┐  ┌▼┐  ┌▼┐  ┌▼┐  ┌▼┐
 *   │I│  │J│  │K│  │L│  │M│  │N│  │O│
 *   └─┘  └─┘  └─┘  └─┘  └─┘  └─┘  └─┘
 */
class BreadthFirst extends Algorithm {
  /**
   * Constructor for the BreadthFirst class.
   *
   * @param {Node} destination The destination Node to search for.
   */
  constructor(destination) {
    super(destination);
    // A collection of in-use data, used for recursive implementations.
    this.cache = {
      queue: [],
      history: []
    };
  }

  /**
   * An instance method for finding a path between two points through a directed graph. Will return
   * undefined if no valid path is found.
   *
   * @param {Node} current A current Node within a directed graph.
   * @param {Vector[]} solution A partial solution, used for recursive implementations.
   * @returns {Vector[]|undefined} A path represented with an array of Vectors, or undefined.
   */
  findPath(current, solution = []) {
    if (_.isUndefined(current)) { return undefined; }
    if (_.isEqual(current, this.destination)) { return solution; }

    this.cache.history.push(current);

    this.cache.queue.push(..._.map(
      _.filter(current.vectors, (considered) => !Algorithm
        .existsInCollection(considered.destination, this.cache.history)),
      (enqueued) => [enqueued.destination, _.concat(solution, enqueued)]
    ));

    return this.findPath(...[this.cache.queue.shift()].flat());
  }
}

module.exports = BreadthFirst;
