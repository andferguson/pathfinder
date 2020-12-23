/** Class representing a vector, which connects twn nodes with a magnitude. */
class Vector {
  constructor(origin, destination, magnitude) {
    this.origin = origin;
    this.destination = destination;
    this.magnitude = magnitude;
  }
}

module.exports = Vector;
