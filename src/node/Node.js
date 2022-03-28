const Vector = require('../vector/Vector');

/**
 * Class representing a point.
 */
class Node {
  constructor(x, y, key) {
    // The x coordinate of this Node within a two-dimensional plane representation
    this.x = x;

    // The y coordinate of this Node within a two-dimensional plane representation
    this.y = y;

    // The display character of this Node
    this.key = key;

    // A Vector[] representing all Vectors connecting this Node to others
    this.vectors = [];
  }

  /**
   * Creates a new Vector, which directs from this Node to another with a given magnitude.
   *
   * Note: This method will make a unidirectional Vector. To make bidirectional Vectors, this method
   * must be used twice, or use {@link Node#createBidirectionalVector}.
   *
   * @param {Node} node The Node to which this new vector will be directed.
   * @param {number} magnitude The magnitude of this new vector.
   */
  createDirectedVector(node, magnitude) {
    this.vectors.push(new Vector(this, node, magnitude));
  }

  /**
   * Creates a pair of new Vectors, which direct both ways between this Node and another with a
   * given magnitude.
   *
   * Note: This method will make Vectors of equal magnitude in both directions. To make directed
   * graphs, use {@link Node#createDirectedVector}.
   *
   * @param {Node} node The Node to and from which new Vectors will be directed.
   * @param {number} magnitude The magnitude of these new Vectors.
   */
  createBidirectionalVector(node, magnitude) {
    this.createDirectedVector(node, magnitude);
    node.createDirectedVector(this, magnitude);
  }
}

module.exports = Node;
