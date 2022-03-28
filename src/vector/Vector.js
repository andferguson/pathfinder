/**
 * Class representing a directed vector, which connects two Nodes with a magnitude.
 */
class Vector {
  constructor(origin, destination, magnitude) {
    // The origin Node of the Vector
    this.origin = origin;

    // The destination Node of the Vector
    this.destination = destination;

    // The magnitude of the Vector
    this.magnitude = magnitude;
  }
}

module.exports = Vector;
