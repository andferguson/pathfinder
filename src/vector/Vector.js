/**
 * Class representing a directed vector, which connects two Nodes with a magnitude.
 *
 * @class
 */
class Vector {
  /**
   * Constructor for the Vector class.
   *
   * @param {Node} origin The origin Node of the Vector.
   * @param {Node} destination The destination Node of the Vector.
   * @param {number} magnitude The magnitude of the Vector.
   */
  constructor(origin, destination, magnitude) {
    this.origin = origin; // The origin Node of the Vector
    this.destination = destination; // The destination Node of the Vector
    this.magnitude = magnitude; // The magnitude of the Vector
  }

  /**
   * Returns a string representation of the Vector on which this is called.
   *
   * @returns {string} A string representation of this Vector.
   */
  get print() { return `${this.origin.print} -[${this.magnitude}]-> ${this.destination.print}`; }

  /**
   * Console logs the string representation of the Vector on which this is called.
   *
   * @returns {undefined}
   */
  // eslint-disable-next-line no-console
  get log() { return console.log(this.print); }
}

module.exports = Vector;
