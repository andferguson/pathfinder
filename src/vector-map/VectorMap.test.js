const _ = require('lodash');

const keys = require('../keys.json');
const Node = require('../node/Node');
const Vector = require('../vector/Vector');
const VectorMap = require('./VectorMap');

describe('VectorMap', () => {
  let height, nodes, width, vectorMap;

  beforeEach(() => {
    width = 3;
    height = 5;
    nodes = [];
    vectorMap = new VectorMap(width, height, nodes, keys);
  });

  test('is a VectorMap with the correct properties', () => {
    expect(vectorMap).toBeInstanceOf(VectorMap);
    expect(vectorMap.width).toBe(width);
    expect(vectorMap.height).toBe(height);
    expect(vectorMap.nodes).toEqual(nodes);
  });

  describe('static', () => {
    describe('stringToVectorMap', () => {
      let mockTwoDimensionalArrayToVectorMap, returnedVectorMap, str;

      beforeEach(() => {
        returnedVectorMap = 'returnedVectorMap';
        str = '🟩🟩🟩⬛️⬛️⬛️⬛️\n'
          + '🟩🟩🟩🪜🟩🟩⬛️\n'
          + '⬛️🟩🟩⬛️🟩🟩⬛️\n'
          + '⬛️🟩🟩⬛️🟩🟩🟩\n'
          + '⬛️⬛️⬛️⬛️🟩🟩🟩';

        mockTwoDimensionalArrayToVectorMap = jest
          .spyOn(VectorMap, 'twoDimensionalArrayToVectorMap')
          .mockReturnValue(returnedVectorMap);
      });

      afterEach(() => {
        mockTwoDimensionalArrayToVectorMap.mockRestore();
      });

      test('converts the string to a two dimensional array and calls'
        + ' VectorMap#twoDimensionalArrayToVectorMap with it', () => {
        const expectedArray = [
          ['🟩', '🟩', '🟩', '⬛️', '⬛️', '⬛️', '⬛️'],
          ['🟩', '🟩', '🟩', '🪜', '🟩', '🟩', '⬛️'],
          ['⬛️', '🟩', '🟩', '⬛️', '🟩', '🟩', '⬛️'],
          ['⬛️', '🟩', '🟩', '⬛️', '🟩', '🟩', '🟩'],
          ['⬛️', '⬛️', '⬛️', '⬛️', '🟩', '🟩', '🟩']
        ];

        VectorMap.stringToVectorMap(str);
        expect(mockTwoDimensionalArrayToVectorMap).toHaveBeenCalledWith(expectedArray);
      });

      test('returns the result of twoDimensionalArrayToVectorMap', () => {
        expect(VectorMap.stringToVectorMap(str)).toBe(returnedVectorMap);
      });
    });

    describe('twoDimensionalArrayToVectorMap', () => {
      test('throws an error when the arrays are not all the same length', () => {
        const invalidArray = [
          ['🟩', '🟩', '🟩', '⬛️', '⬛️', '⬛️', '⬛️'],
          ['🟩', '🟩', '🟩', '🟩', '🟩', '🟩'],
          ['⬛️', '🟩', '🟩', '⬛️', '🟩', '🟩', '⬛️']
        ];

        expect(() => VectorMap.twoDimensionalArrayToVectorMap(invalidArray))
          .toThrowError('VectorMap: cannot convert arrays with non-standard length');
      });

      test('returns a new vector map with a node for every array index', () => {
        const validArray = [
          ['🟩', '🟩', '🟩', '⬛️', '⬛️', '⬛️', '⬛️'],
          ['🟩', '🟩', '🟩', '🪜', '🟩', '🟩', '⬛️'],
          ['⬛️', '🟩', '🟩', '⬛️', '🟩', '🟩', '⬛️'],
          ['⬛️', '🟩', '🟩', '⬛️', '🟩', '🟩', '🟩'],
          ['⬛️', '⬛️', '⬛️', '⬛️', '🟩', '🟩', '🟩']
        ];

        vectorMap = VectorMap.twoDimensionalArrayToVectorMap(validArray);

        expect(vectorMap).toBeInstanceOf(VectorMap);
        expect(vectorMap.width).toBe(validArray[0].length);
        expect(vectorMap.height).toBe(validArray.length);
        expect(vectorMap.nodes).toHaveLength(vectorMap.width * vectorMap.height);
        _.each(vectorMap.nodes, (node) => expect(node).toBeInstanceOf(Node));
      });

      test('attaches the correct vectors to every node based on their key', () => {
        vectorMap = VectorMap.twoDimensionalArrayToVectorMap([
          ['⬛️', '🟩', '⬛️'],
          ['⬛️', '🪜', '🟩'],
          ['🟩', '⬛️', '⬛️']
        ]);

        expect(vectorMap.nodes[0].vectors).toHaveLength(1);
        expect(vectorMap.nodes[0].vectors[0].destination).toBe(vectorMap.nodes[3]);
        expect(vectorMap.nodes[0].vectors[0].magnitude).toBe(keys['⬛️'].magnitude);

        expect(vectorMap.nodes[1].vectors).toHaveLength(1);
        expect(vectorMap.nodes[1].vectors[0].destination).toBe(vectorMap.nodes[4]);
        expect(vectorMap.nodes[1].vectors[0].magnitude).toBe(keys['🪜'].magnitude);

        expect(vectorMap.nodes[2].vectors).toHaveLength(0);

        expect(vectorMap.nodes[3].vectors).toHaveLength(2);
        expect(vectorMap.nodes[3].vectors[0].destination).toBe(vectorMap.nodes[0]);
        expect(vectorMap.nodes[3].vectors[0].magnitude).toBe(keys['⬛️'].magnitude);
        expect(vectorMap.nodes[3].vectors[1].destination).toBe(vectorMap.nodes[4]);
        expect(vectorMap.nodes[3].vectors[1].magnitude).toBe(keys['🪜'].magnitude);

        expect(vectorMap.nodes[4].vectors).toHaveLength(4);
        expect(vectorMap.nodes[4].vectors[0].destination).toBe(vectorMap.nodes[3]);
        expect(vectorMap.nodes[4].vectors[0].magnitude).toBe(keys['⬛️'].magnitude);
        expect(vectorMap.nodes[4].vectors[1].destination).toBe(vectorMap.nodes[1]);
        expect(vectorMap.nodes[4].vectors[1].magnitude).toBe(keys['🟩'].magnitude);
        expect(vectorMap.nodes[4].vectors[2].destination).toBe(vectorMap.nodes[5]);
        expect(vectorMap.nodes[4].vectors[2].magnitude).toBe(keys['🟩'].magnitude);
        expect(vectorMap.nodes[4].vectors[3].destination).toBe(vectorMap.nodes[7]);
        expect(vectorMap.nodes[4].vectors[3].magnitude).toBe(keys['⬛️'].magnitude);

        expect(vectorMap.nodes[5].vectors).toHaveLength(1);
        expect(vectorMap.nodes[5].vectors[0].destination).toBe(vectorMap.nodes[4]);
        expect(vectorMap.nodes[5].vectors[0].magnitude).toBe(keys['🪜'].magnitude);

        expect(vectorMap.nodes[6].vectors).toHaveLength(0);

        expect(vectorMap.nodes[7].vectors).toHaveLength(2);
        expect(vectorMap.nodes[7].vectors[0].destination).toBe(vectorMap.nodes[4]);
        expect(vectorMap.nodes[7].vectors[0].magnitude).toBe(keys['🪜'].magnitude);
        expect(vectorMap.nodes[7].vectors[1].destination).toBe(vectorMap.nodes[8]);
        expect(vectorMap.nodes[7].vectors[1].magnitude).toBe(keys['⬛️'].magnitude);

        expect(vectorMap.nodes[8].vectors).toHaveLength(1);
        expect(vectorMap.nodes[8].vectors[0].destination).toBe(vectorMap.nodes[7]);
        expect(vectorMap.nodes[8].vectors[0].magnitude).toBe(keys['⬛️'].magnitude);
      });
    });
  });

  describe('findNode', () => {
    let largeVectorMap;

    beforeEach(() => {
      vectorMap = VectorMap.twoDimensionalArrayToVectorMap([['⬛️', '🟩']]);
      largeVectorMap = VectorMap.twoDimensionalArrayToVectorMap([
        ['⬛️', '🟩'],
        ['⬛️', '⬛️'],
        ['🪜', '🟩']
      ]);
    });

    test('finds and returns the correct node from the vector map', () => {
      _.each(vectorMap.nodes, (node) => {
        expect(vectorMap.findNode(node.x, node.y)).toBe(node);
      });

      _.each(largeVectorMap.nodes, (node) => {
        expect(largeVectorMap.findNode(node.x, node.y)).toBe(node);
      });
    });

    test('returns undefined for out-of-bounds inputs', () => {
      expect(vectorMap.findNode(-1, -1)).toBeUndefined();
      expect(vectorMap.findNode(4, 4)).toBeUndefined();
      expect(largeVectorMap.findNode(-1, -1)).toBeUndefined();
      expect(largeVectorMap.findNode(4, 4)).toBeUndefined();
    });
  });

  describe('isTraversable', () => {
    test('returns true for traversable keys sets', () => {
      expect(vectorMap.isTraversable('🟩', '🟩')).toBe(true);
      expect(vectorMap.isTraversable('🟩', '🪜')).toBe(true);
      expect(vectorMap.isTraversable('⬛️', '⬛️')).toBe(true);
      expect(vectorMap.isTraversable('⬛️', '🪜')).toBe(true);
      expect(vectorMap.isTraversable('🪜', '🪜')).toBe(true);
    });

    test('returns false for non-traversable keys', () => {
      expect(vectorMap.isTraversable('🟩', '⬛️')).toBe(false);
      expect(vectorMap.isTraversable('⬛️', '🟩')).toBe(false);
    });

    test('returns false for unlisted keys', () => {
      expect(vectorMap.isTraversable('🟩', '™')).toBe(false);
      expect(vectorMap.isTraversable('™', '🟩')).toBe(false);
      expect(vectorMap.isTraversable('™', '™')).toBe(false);
    });
  });

  describe('printTraversal', () => {
    /**
     * 🟩🟩🪜⬛️⬛️⬛️⬛️
     * 🟩🟩🟩🪜🟩🟩🪜
     * ⬛️⬛️🟩⬛️🟩🟩⬛️
     * ⬛️🟩🟩⬛️🪜🟩⬛️
     * 🟩🟩🟩⬛️🪜🟩⬛️
     * ⬛️🪜🟩🪜🟩🟩🟩
     * ⬛️⬛️⬛️⬛️🟩🟩🟩
     */
    const array = [
      ['🟩', '🟩', '🪜', '⬛️', '⬛️', '⬛️', '⬛️'],
      ['🟩', '🟩', '🟩', '🪜', '🟩', '🟩', '🪜'],
      ['⬛️', '⬛️', '🟩', '⬛️', '🟩', '🟩', '⬛️'],
      ['⬛️', '🟩', '🟩', '⬛️', '🪜', '🟩', '⬛️'],
      ['🟩', '🟩', '🟩', '⬛️', '🪜', '🟩', '⬛️'],
      ['⬛️', '🪜', '🟩', '🪜', '🟩', '🟩', '🟩'],
      ['⬛️', '⬛️', '⬛️', '⬛️', '🟩', '🟩', '🟩']
    ];

    ['🟩', '🟩', '🪜', '⬛️', '⬛️', '⬛️', '⬛️'],
    ['🟩', '🟩', '*️⃣', '➡️', '↘️', '🟩', '🪜'],
    ['⬛️', '↗️', '🟩', '⬛️', '🟩', '⬇️', '⬛️'],
    ['⬛️', '⬆️', '◻', '⬛️', '🪜', '↙️', '⬛️'],
    ['🟩', '🟩', '↖️', '⬅️', '⬅️', '🟩', '⬛️'],
    ['⬛️', '🪜', '🟩', '🪜', '🟩', '🟩', '🟩'],
    ['⬛️', '⬛️', '⬛️', '⬛️', '🟩', '🟩', '🟩']

    const vectorMap = VectorMap.twoDimensionalArrayToVectorMap(array);

    test('returns a unmodified VectorMap print when the path is empty', () => {
      expect(vectorMap.printTraversal(undefined)).toMatchSnapshot();
      expect(vectorMap.printTraversal(null)).toMatchSnapshot();
      expect(vectorMap.printTraversal([])).toMatchSnapshot();
    });

    test('throws an error for invalid paths', () => {
      expect(() => vectorMap.printTraversal([
        new Vector(new Node(-1, 0), vectorMap.findNode(0, 0), 1)
      ])).toThrowError('VectorMap: unknown path for traversal');
    });

    test('returns a modified VectorMap print with the path traversal', () => {
      expect(vectorMap.printTraversal([
        new Vector(vectorMap.findNode(3, 1), vectorMap.findNode(4, 1), 1),
        new Vector(vectorMap.findNode(4, 1), vectorMap.findNode(5, 2), 1),
        new Vector(vectorMap.findNode(5, 2), vectorMap.findNode(5, 3), 1),
        new Vector(vectorMap.findNode(5, 3), vectorMap.findNode(4, 4), 1),
        new Vector(vectorMap.findNode(4, 4), vectorMap.findNode(3, 4), 1),
        new Vector(vectorMap.findNode(3, 4), vectorMap.findNode(2, 4), 1),
        new Vector(vectorMap.findNode(2, 4), vectorMap.findNode(1, 3), 1),
        new Vector(vectorMap.findNode(1, 3), vectorMap.findNode(1, 2), 1),
        new Vector(vectorMap.findNode(1, 2), vectorMap.findNode(2, 1), 1)
      ])).toMatchSnapshot();
    });
  });

  describe('logTraversal', () => {
    /**
     * 🟩⬛️🟩
     * 🟩🟩🟩
     * 🟩🟩🟩
     */
    const vectorMapString = '🟩⬛️🟩\n🟩🟩🟩\n🟩🟩🟩';
    const vectorMap = VectorMap.stringToVectorMap(vectorMapString);

    /**
     * ⬇️⬛️🟩
     * ➡️*️⃣🟩
     * 🟩🟩🟩
     */
    const vectorString = '[origin] -[1]-> [destination]';
    const path = [
      new Vector(vectorMap.findNode(0, 0), vectorMap.findNode(0, 1), 1),
      new Vector(vectorMap.findNode(0, 1), vectorMap.findNode(1, 1), 1)
    ];

    const traversalString = '⬇️⬛️🟩\n➡️*️⃣🟩\n🟩🟩🟩';

    beforeEach(() => {
      _.each(path, (vector) => {
        jest.spyOn(vector, 'print', 'get').mockReturnValue(vectorString);
      })
      jest.spyOn(vectorMap, 'print', 'get').mockReturnValue(vectorMapString);
      jest.spyOn(vectorMap, 'printTraversal').mockReturnValue(traversalString);
      jest.spyOn(console, 'log').mockImplementation();
    });

    test('logs a printable sting representing the vector map', () => {
      expect(vectorMap.logTraversal(path)).toBeUndefined();
      expect(console.log).toBeCalledWith(vectorMapString);
    });

    test('logs a printable sting representing the path', () => {
      expect(vectorMap.logTraversal(path)).toBeUndefined();
      expect(console.log).toBeCalledWith(`Path: [\n\t${vectorString}\n\t${vectorString}\n]`);
    });

    test('logs a printable sting representing the path traversal on the vector map', () => {
      expect(vectorMap.logTraversal(path)).toBeUndefined();
      expect(console.log).toBeCalledWith(traversalString);
    });
  });

  describe('get toTwoDimensionalArray', () => {
    test('converts the VectorMap to a two dimensional array', () => {
      vectorMap = VectorMap.stringToVectorMap('⬛️🟩');
      expect(vectorMap.toTwoDimensionalArray).toEqual([['⬛️', '🟩']]);
    });

    test('converts the vertical VectorMap to a two dimensional array', () => {
      vectorMap = VectorMap.stringToVectorMap('⬛️\n🟩');
      expect(vectorMap.toTwoDimensionalArray).toEqual([['⬛️'], ['🟩']]);
    });

    test('converts the large VectorMap to a two dimensional array', () => {
      vectorMap = VectorMap.stringToVectorMap('⬛️🟩\n⬛️⬛️\n🪜🟩');
      expect(vectorMap.toTwoDimensionalArray).toEqual([['⬛️', '🟩'], ['⬛️', '⬛️'], ['🪜', '🟩']]);
    });
  });

  describe('get print', () => {
    test('converts the VectorMap to a string', () => {
      const expectedString = '⬛️🟩';
      vectorMap = VectorMap.stringToVectorMap(expectedString);
      expect(vectorMap.print).toBe(expectedString);
    });

    test('converts the vertical vector map to a string', () => {
      const expectedString = '⬛️\n🟩';
      vectorMap = VectorMap.stringToVectorMap(expectedString);
      expect(vectorMap.print).toBe(expectedString);
    });

    test('converts the large VectorMap to a string', () => {
      const expectedString = '⬛️🟩\n⬛️⬛️\n🪜🟩';
      vectorMap = VectorMap.stringToVectorMap(expectedString);
      expect(vectorMap.print).toBe(expectedString);
    });
  });

  describe('get log', () => {
    test('console logs a printable sting representing the vector map', () => {
      const vectorMapString = '◻🟩🟩⬛️⬛️⬛️⬛️\n🟩🟩🟩🪜🟩🟩⬛️\n⬛️🟩🟩⬛️🟩🟩⬛️\n⬛️🟩🟩⬛️🟩🟩🟩\n⬛️⬛️⬛️⬛️🟩🟩🟩';

      jest.spyOn(vectorMap, 'print', 'get').mockReturnValue(vectorMapString);
      jest.spyOn(console, 'log').mockImplementation();

      expect(vectorMap.log).toBeUndefined();
      expect(console.log).toBeCalledWith(vectorMapString);
    });
  });
});
