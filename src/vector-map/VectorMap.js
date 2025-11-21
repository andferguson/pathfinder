const _ = require('lodash');

const defaultKeys = require('../keys.json');
const Node = require('../node/Node');
const Vector = require('../vector/Vector');

/**
 * Class representing a two-dimensional plane comprised of nodes connected by vectors.
 *
 * @class
 */
class VectorMap {
  /**
   * Constructor for the VectorMap class.
   *
   * @param {number} width The width of the vector map.
   * @param {number} height The height of the vector map.
   * @param {Node[]} nodes The nodes in the vector map.
   * @param {object} keys The keys object defining traversable keys.
   */
  constructor(width, height, nodes = [], keys = defaultKeys) {
    this.width = width;
    this.height = height;
    this.nodes = nodes;
    this.keys = keys;
  }

  /**
   * A prototype method for creating a new VectorMap given an appropriate string representation.
   *
   * @static
   * @param {string} str A string to convert to a vector map.
   * @returns {VectorMap} A new VectorMap.
   * @example
   * str = "🟩🟩🟩⬛️⬛️⬛️⬛️\n🟩🟩🟩🪜🟩🟩⬛️\n⬛️🟩🟩⬛️🟩🟩⬛️\n⬛️🟩🟩⬛️🟩🟩🟩\n⬛️⬛️⬛️⬛️🟩🟩🟩";
   */
  static stringToVectorMap(str) {
    const arrayRepresentation = _.map(_.split(str, '\n'), (row) => _.split(row, ''));
    return VectorMap.twoDimensionalArrayToVectorMap(arrayRepresentation);
  }

  /**
   * A prototype method for creating a new VectorMap given an appropriate two-dimensional
   * representation.
   *
   * @static
   * @param {string[][]} arr An array of arrays of strings to convert to a vector map.
   * @returns {VectorMap} A new VectorMap.
   * @example
   * arr = [
   *  ['🟩', '🟩', '🟩', '⬛️', '⬛️', '⬛️', '⬛️'],
   *  ['🟩', '🟩', '🟩', '🪜', '🟩', '🟩', '⬛️'],
   *  ['⬛️', '🟩', '🟩', '⬛️', '🟩', '🟩', '⬛️'],
   *  ['⬛️', '🟩', '🟩', '⬛️', '🟩', '🟩', '🟩'],
   *  ['⬛️', '⬛️', '⬛️', '⬛️', '🟩', '🟩', '🟩']
   * ];
   */
  static twoDimensionalArrayToVectorMap(arr) {
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

        const node = new Node(widthIndex, heightIndex, key);
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
   * @param {string} origin The character key to evaluate.
   * @param {string} destination The character key to evaluate.
   * @returns {boolean} True if traversable, false otherwise.
   */
  isTraversable(origin, destination) {
    return _.includes(_.get(this.keys, `[${origin}].traversableKeys`, []), destination);
  }

  /**
   * Returns a string representation of a path overlaid on the VectorMap on which this is called.
   *
   * @param {Vector[]} path The path to overlay on the VectorMap.
   * @returns {string} A string representation of a path overlaid on this VectorMap.
   */
  printTraversal(path) {
    const safeClone = _.cloneDeep(this);

    if (!_.isEmpty(path)) {
      _.each(path, ({ origin: { x: x1, y: y1 }, destination: { x: x2, y: y2 } }) => {
        const current = safeClone.findNode(x1, y1);
        const next = safeClone.findNode(x2, y2);

        if (_.isNil(current) || _.isNil(next)) {
          throw new Error('VectorMap: unknown path for traversal');
        }

        // eslint-disable-next-line default-case
        switch (Math.sign(x1 - x2)) {
          case -1:
            // eslint-disable-next-line default-case
            switch (Math.sign(y1 - y2)) {
              case -1: current.key = '↘️'; break;
              case 1: current.key = '↗️'; break;
              case 0: current.key = '➡️'; break;
            } break;
          case 1:
            // eslint-disable-next-line default-case
            switch (Math.sign(y1 - y2)) {
              case -1: current.key = '↙️'; break;
              case 1: current.key = '↖️'; break;
              case 0: current.key = '⬅️'; break;
            } break;
          case 0:
            // eslint-disable-next-line default-case
            switch (Math.sign(y1 - y2)) {
              case -1: current.key = '⬇️'; break;
              case 1: current.key = '⬆️'; break;
              case 0: current.key = '*️⃣'; break;
            } break;
        }
      });

      const { x, y } = _.last(path).destination;
      safeClone.findNode(x, y).key = '*️⃣';
    }

    return safeClone.print;
  }

  /**
   * Console logs a string representation of a path overlaid on the VectorMap on which this is
   * called.
   *
   * @param {Vector[]} path The path to log.
   * @returns {void}
   */
  logTraversal(path) {
    /* eslint-disable no-console */
    console.log(this.print);
    console.log(`Path: [\n\t${_.map(path, 'print').join('\n\t')}\n]`);
    console.log(this.printTraversal(path));
    /* eslint-enable no-console */
  }

  /**
   * A helper method for creating an appropriate two-dimensional array representation of a
   * VectorMap.
   *
   * NOTE: The reverse of {@link VectorMap#twoDimensionalArrayToVectorMap}.
   * WARNING: Vector data is not represented with this method.
   *
   * @returns {string[][]} An array of arrays of strings representation of a VectorMap.
   */
  get toTwoDimensionalArray() {
    return _.chunk(_.map(this.nodes, 'key'), this.width);
  }

  /**
   * Returns a string representation of the VectorMap on which this is called.
   *
   * NOTE: The reverse of {@link VectorMap#stringToVectorMap}.
   * WARNING: Vector data is not represented with this method.
   *
   * @returns {string} A string representation of this VectorMap.
   */
  get print() { return _.join(_.map(this.toTwoDimensionalArray, (arr) => _.join(arr, '')), '\n'); }

  /**
   * Console logs the string representation of the VectorMap on which this is called.
   *
   * @returns {undefined}
   */
  // eslint-disable-next-line no-console
  get log() { return console.log(this.print); }
}

module.exports = VectorMap;
