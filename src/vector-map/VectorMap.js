const _ = require('lodash');

const Node = require('../node/Node');
const defaultKeys = require('../keys.json');

/** Class representing a two-dimensional plane comprised of nodes connected by vectors. */
class VectorMap {
  constructor(width, height, nodes = [], keys = defaultKeys) {
    this.width = width;
    this.height = height;
    this.nodes = nodes;
    this.keys = keys;
  }

  /**
   * A prototype method for creating a new VectorMap given an appropriate string representation.
   *
   * @param {string} str A string to convert to a vector map.
   * @example
   * str = "◻︎◻︎◻︎◼︎◼︎◼︎◼︎\n◻︎◻︎◻︎◘◻︎◻︎◼︎\n◼︎◻︎◻︎◼︎◻︎◻︎◼︎\n◼︎◻︎◻︎◼︎◻︎◻︎◻︎\n◼︎◼︎◼︎◼︎◻︎◻︎◻︎";
   * @returns {VectorMap} A new VectorMap.
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
   * @example
   * arr = [
   *  ['◻︎', '◻︎', '◻︎', '◼︎', '◼︎', '◼︎', '◼︎'],
   *  ['◻︎', '◻︎', '◻︎', '◘', '◻︎', '◻︎', '◼︎'],
   *  ['◼︎', '◻︎', '◻︎', '◼︎', '◻︎', '◻︎', '◼︎'],
   *  ['◼︎', '◻︎', '◻︎', '◼︎', '◻︎', '◻︎', '◻︎'],
   *  ['◼︎', '◼︎', '◼︎', '◼︎', '◻︎', '◻︎', '◻︎']
   * ];
   * @returns {VectorMap} A new VectorMap.
   */
  static convertTwoDimensionalArrayToVectorMap(arr) {
    const height = arr.length;
    const width = arr[0].length;

    if (!_.every(arr, (row) => row.length === width)) {
      throw new Error('VectorMap: cannot convert arrays with non-standard length');
    }

    const vectorMap = new VectorMap(width, height);

    _.times(height, (heightIndex) => {
      _.times(width, (widthIndex) => {
        const key = arr[heightIndex][widthIndex];

        if (!_.has(vectorMap, `keys[${key}]`)) {
          throw new Error(
            `VectorMap: attempted to parse unknown key: [${key}] at (${heightIndex}, ${widthIndex})`
          );
        }

        const node = new Node(heightIndex, widthIndex, key);
        if (widthIndex) {
          const prevNode = _.last(vectorMap.nodes);
          // Link this Node to the previous Node with magnitude.
          if (vectorMap.isTraversable(key, prevNode.key)) {
            node.createDirectedVector(prevNode, vectorMap.keys[prevNode.key].magnitude);
          }

          // Link the previous Node to this Node with magnitude.
          if (vectorMap.isTraversable(prevNode.key, key)) {
            prevNode.createDirectedVector(node, vectorMap.keys[key].magnitude);
          }
        }

        const nodeAboveIndex = ((heightIndex - 1) * width) + widthIndex;
        if (nodeAboveIndex >= 0) {
          const nodeAbove = vectorMap.nodes[nodeAboveIndex];
          // Link this Node to the above Node with magnitude.
          if (vectorMap.isTraversable(key, nodeAbove.key)) {
            node.createDirectedVector(nodeAbove, vectorMap.keys[nodeAbove.key].magnitude);
          }

          // Link the above Node to this Node with magnitude.
          if (vectorMap.isTraversable(nodeAbove.key, key)) {
            nodeAbove.createDirectedVector(node, vectorMap.keys[key].magnitude);
          }
        }

        vectorMap.nodes.push(node);
      });
    });

    return vectorMap;
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
   * @returns {Node|undefined} The requested Node, or undefined.
   */
  findNode(x, y) {
    return this.nodes[(y * this.width) + x];
  }

  /**
   * Returns true if it is valid to traverse from the origin key to the destination key, otherwise
   * returns false.
   *
   * @param {string} origin The character key to evaluate
   * @param {string} destination The character key to evaluate
   * @returns {boolean} True if traversable, false otherwise.
   */
  isTraversable(origin, destination) {
    return _.includes(_.get(this.keys, `[${origin}].traversableKeys`, []), destination);
  }

  /**
   * A helper method for creating an appropriate string representation of a VectorMap.
   *
   * Note: The reverse of {@link VectorMap#convertStringToVectorMap}.
   * Warning: Vector data is not represented with this method.
   *
   * @returns {string} A string representation of a VectorMap.
   */
  get toString() {
    return _.reduce(
      this.nodes,
      (acc, node, index) => {
        const key = (index + 1) % this.width ? node.key : `${node.key}\n`;
        return acc + key;
      },
      ''
    );
  }

  /**
   * A helper method for creating an appropriate two-dimensional array representation of a
   * VectorMap.
   *
   * Note: The reverse of {@link VectorMap#convertTwoDimensionalArrayToVectorMap}.
   * Warning: Vector data is not represented with this method.
   *
   * @returns {string} A string representation of a VectorMap.
   */
  get toTwoDimensionalArray() {
    return _.map(_.split(this.asString, '\n'), (row) => _.split(row, ''));
  }
}

module.exports = VectorMap;
