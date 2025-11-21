const Vector = require('../vector/Vector');

/**
 * Class representing a point.
 *
 * @class
 */
class Node {
  /**
   * Constructor for the Node class.
   *
   * @param {number} x The x coordinate of this Node within a two-dimensional plane.
   * @param {number} y The y coordinate of this Node within a two-dimensional plane.
   * @param {string} key The display character of this Node.
   */
  constructor(x, y, key) {
    this.x = x; // The x coordinate of this Node within a two-dimensional plane
    this.y = y; // The y coordinate of this Node within a two-dimensional plane
    this.key = key; // The display character of this Node

    this.vectors = []; // A Vector[] representing all Vectors connecting this Node to others
  }

  /**
   * Creates a new Vector, which directs from this Node to another with a given magnitude.
   *
   * NOTE: This method will make a unidirectional Vector. To make bidirectional Vectors, this method
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
   * NOTE: This method will make Vectors of equal magnitude in both directions. To make directed
   * graphs, use {@link Node#createDirectedVector}.
   *
   * @param {Node} node The Node to and from which new Vectors will be directed.
   * @param {number} magnitude The magnitude of these new Vectors.
   */
  createBidirectionalVector(node, magnitude) {
    this.createDirectedVector(node, magnitude);
    node.createDirectedVector(this, magnitude);
  }

  /**
   * Returns a string representation of the Node on which this is called.
   *
   * @returns {string} A string representation of this Node.
   */
  get print() { return `[${this.key}]{${this.x}, ${this.y}}`; }

  /**
   * Console logs the string representation of the Node on which this is called.
   *
   * @returns {undefined}
   */
  // eslint-disable-next-line no-console
  get log() { return console.log(this.print); }
}

module.exports = Node;
