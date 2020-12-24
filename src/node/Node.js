const Vector = require('../vector/Vector');

/** Class representing a point. */
class Node {
  constructor(x, y, key) {
    this.x = x;
    this.y = y;
    this.key = key;
    this.vectors = [];
  }

  /**
   * Creates a new Vector, which directs from this node to another with a given magnitude.
   *
   * @param {Node} node The node to which this new vector will be directed.
   * @param {number} magnitude The magnitude of this new vector.
   */
  addDirectedVector(node, magnitude) {
    this.vectors.push(new Vector(this, node, magnitude));
  }

  /**
   * Creates a pair of new Vectors, which direct both ways between this node and another with a
   * given magnitude.
   *
   * @param {Node} node The node to/from which new vectors will be directed.
   * @param {number} magnitude The magnitude of these new vectors.
   */
  addBidirectionalVector(node, magnitude) {
    this.addDirectedVector(node, magnitude);
    node.addDirectedVector(this, magnitude);
  }
}

module.exports = Node;
