const Node = require('../node/Node');
const Vector = require('./Vector');

describe('Vector', () => {
  let destination, magnitude, origin, vector;

  beforeEach(() => {
    origin = new Node(1, 2, '◻︎');
    destination = new Node(2, 2, '◻︎');
    magnitude = 0.05;
    vector = new Vector(origin, destination, magnitude);
  });

  test('is a Vector with the correct properties', () => {
    expect(vector).toBeInstanceOf(Vector);
    expect(vector.origin).toBe(origin);
    expect(vector.destination).toBe(destination);
    expect(vector.magnitude).toBe(magnitude);
  });
});
