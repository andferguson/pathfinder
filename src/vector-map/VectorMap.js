const _ = require('lodash');

const Node = require('../node/Node');

const KEYS = {
  PATH: {
    CHARACTER: '.',
    MAGNITUDE: 0
  },
  WALL: {
    CHARACTER: '#',
    MAGNITUDE: 1
  }
};

/** Class representing a two-dimensional plane comprised of nodes connected by vectors. */
class VectorMap {
  constructor(width, height, nodes) {
    this.width = width;
    this.height = height;
    this.nodes = nodes;
  }

  /**
   * A prototype method for creating a new VectorMap given an appropriate string representation.
   *
   * @param {string} str A string to convert to a vector map.
   * @returns {VectorMap}
   */
  static convertStringToVectorMap(str) {
    const arrayRepresentation = _.map(_.split(str, '\n'), (row) => _.split(row, ''));
    return VectorMap.convertTwoDimensionalArrayToVectorMap(arrayRepresentation);
  }

  /**
   * A prototype method for creating a new VectorMap given an appropriate two-dimensional
   * representation.
   *
   * @param {string[][]} arr An array of arrays of strings to convert to a vector map.
   * @returns {VectorMap}
   */
  static convertTwoDimensionalArrayToVectorMap(arr) {
    const height = arr.length;
    const width = arr[0].length;

    if (!_.every(arr, (row) => row.length === width)) {
      throw new Error('Pathfinder: cannot convert arrays with nonstandard length');
    }

    const nodes = [];

    for (let i = 0; i < height; i += 1) {
      for (let j = 0; j < width; j += 1) {
        const key = arr[i][j];
        const node = new Node(i, j, key);

        if (key === KEYS.PATH.CHARACTER) {
          if (j && _.last(nodes).key === KEYS.PATH.CHARACTER) {
            node.addBidirectionalVector(_.last(nodes), KEYS.PATH.MAGNITUDE);
          }

          if (i && nodes[((i - 1) * width) + j].key === KEYS.PATH.CHARACTER) {
            node.addBidirectionalVector(nodes[((i - 1) * width) + j], KEYS.PATH.MAGNITUDE);
          }
        }

        nodes.push(node);
      }
    }

    return new VectorMap(width, height, nodes);
  }

  /**
   * Retrieves a Node given its x and y attributes.
   *
   * NOTE: As this.nodes is a one-dimensional representation of a two-dimensional plane, we can use
   * the known width of each row to achieve O(1) lookups.
   *
   * NOTE: The origin of the plane is the top-left corner and uses "upside-down" y-coordinates.
   *
   * @param {number} x The x coordinate of the node.
   * @param {number} y The y coordinate of the node.
   * @returns {Node}
   */
  findNode(x, y) {
    return this.nodes[(y * this.width) + x];
  }
}

module.exports = {
  KEYS,
  VectorMap
};
