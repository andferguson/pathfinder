const _ = require('lodash');

const Node = require('../node/Node');
const Vector = require('../vector/Vector');
const Algorithm = require('./Algorithm');

/**
 * Class representing a depth-first search pathfinding algorithm. Utilizes an internal stack to
 * evaluate every Node a from deepest to shallowest.
 *
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
   * A prototype method for finding a path between two points through a directed graph. Will return
   * undefined if no valid path is found.
   *
   * @param {Node} origin An origin Node within a directed graph.
   * @param {Node} destination A destination Node within a directed graph
   * @param {Vector[]} solution A partial solution, used for recursive implementations.
   * @param {Vector[]} cache THe collection of every vector currently under evaluation, used for
   *  recursive implementations.
   * @returns {Vector[]|undefined} A path represented with an array of Vectors, or undefined.
   */
  static findPath(origin, destination, solution = [], cache = []) {
    if (Algorithm.existsInCollection(destination, solution)) {
      return solution;
    }

    const evalVectors = _.filter(origin.vectors, (vector) => (
      !Algorithm.existsInCollection(vector, cache)
    ));

    return _.find(evalVectors, (vector) => DepthFirst.findPath(
      vector,
      destination,
      _.concat(solution, vector),
      _.concat(cache, evalVectors)
    ));
  }
}

module.exports = DepthFirst;
