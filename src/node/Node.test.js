const Node = require('./Node');
const Vector = require('../vector/Vector');

describe('Node', () => {
  let key, node, x, y;

  beforeEach(() => {
    x = 3;
    y = 5;
    key = '.';
    node = new Node(x, y, key);
  });

  test('is a Node with the correct properties', () => {
    expect(node).toBeInstanceOf(Node);
    expect(node.x).toBe(x);
    expect(node.y).toBe(y);
    expect(node.key).toBe(key);
    expect(node.vectors).toEqual([]);
  });

  describe('addDirectedVector', () => {
    let magnitude, otherNode;

    beforeEach(() => {
      magnitude = 3;
      otherNode = new Node(1, 2, 'test');
    });

    test('creates a directed vector to the passed node with the correct magnitude', () => {
      node.addDirectedVector(otherNode, magnitude);

      expect(node.vectors).toHaveLength(1);
      expect(node.vectors[0]).toBeInstanceOf(Vector);
      expect(node.vectors[0].origin).toBe(node);
      expect(node.vectors[0].destination).toBe(otherNode);
      expect(node.vectors[0].magnitude).toBe(magnitude);
    });
  });

  describe('addBidirectionalVector', () => {
    let magnitude, otherNode;

    beforeEach(() => {
      magnitude = 3;
      otherNode = new Node(1, 2, 'test');
    });

    test('creates a directed vector to the passed node with the correct magnitude', () => {
      node.addBidirectionalVector(otherNode, magnitude);

      expect(node.vectors).toHaveLength(1);
      expect(node.vectors[0]).toBeInstanceOf(Vector);
      expect(node.vectors[0].origin).toBe(node);
      expect(node.vectors[0].destination).toBe(otherNode);
      expect(node.vectors[0].magnitude).toBe(magnitude);
    });

    test('creates a directed vector from the passed node with the correct magnitude', () => {
      expect(otherNode.vectors).toHaveLength(0);

      node.addBidirectionalVector(otherNode, magnitude);

      expect(otherNode.vectors).toHaveLength(1);
      expect(otherNode.vectors[0]).toBeInstanceOf(Vector);
      expect(otherNode.vectors[0].origin).toBe(otherNode);
      expect(otherNode.vectors[0].destination).toBe(node);
      expect(otherNode.vectors[0].magnitude).toBe(magnitude);
    });
  });
});
