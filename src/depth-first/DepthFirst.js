const _ = require('lodash');

const Node = require('../node/Node');
const Vector = require('../vector/Vector');
const Algorithm = require('../algorithm/Algorithm');

/**
 * Class representing a depth-first search pathfinding algorithm. Utilizes an internal stack to
 * evaluate every Node a from deepest to shallowest.
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
 *         ┌───┤B│  │I│  │J├───┐
 *         │   └┬┘  └─┘  └┬┘   │
 *         │    │         │    │
 *        ┌▼┐  ┌▼┐       ┌▼┐  ┌▼┐
 *    ┌───┤C│  │F├───┐   │K│  │M├───┐
 *    │   └┬┘  └┬┘   │   └┬┘  └┬┘   │
 *    │    │    │    │    │    │    │
 *   ┌▼┐  ┌▼┐  ┌▼┐  ┌▼┐  ┌▼┐  ┌▼┐  ┌▼┐
 *   │D│  │E│  │G│  │H│  │L│  │N│  │O│
 *   └─┘  └─┘  └─┘  └─┘  └─┘  └─┘  └─┘
 */
class DepthFirst extends Algorithm {
  /**
   * Constructor for the DepthFirst class.
   *
   * @param {Node} destination The destination Node to search for.
   */
  constructor(destination) {
    super(destination);
    // A collection of in-use data, used for recursive implementations.
    this.cache = {
      stack: [],
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

    this.cache.stack.push(..._.map(
      _.filter(current.vectors, (considered) => !Algorithm
        .existsInCollection(considered.destination, this.cache.history)),
      (stacked) => [stacked.destination, _.concat(solution, stacked)]
    ));

    return this.findPath(...[this.cache.stack.pop()].flat());
  }
}

module.exports = DepthFirst;
