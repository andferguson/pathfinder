const _ = require('lodash');

const Node = require('../node/Node');
const {
  KEYS,
  VectorMap
} = require('./VectorMap');

describe('VectorMap', () => {
  let height, nodes, width, vectorMap;

  beforeEach(() => {
    width = 3;
    height = 5;
    nodes = [];
    vectorMap = new VectorMap(width, height, nodes);
  });

  test('is a VectorMap with the correct properties', () => {
    expect(vectorMap).toBeInstanceOf(VectorMap);
    expect(vectorMap.width).toBe(width);
    expect(vectorMap.height).toBe(height);
    expect(vectorMap.nodes).toEqual(nodes);
  });

  describe('findNode', () => {
    let largeVectorMap;

    beforeEach(() => {
      const x = 0;
      const y = 0;

      vectorMap = new VectorMap(2, 1, [
        new Node(x, y, 'node'),
        new Node(x + 1, y, 'nodeTwo')
      ]);

      largeVectorMap = new VectorMap(2, 3, [
        new Node(x, y, 'node'),
        new Node(x + 1, y, 'nodeTwo'),
        new Node(x, y + 1, 'nodeThree'),
        new Node(x + 1, y + 1, 'nodeFour'),
        new Node(x, y + 2, 'nodeFive'),
        new Node(x + 1, y + 2, 'nodeSix')
      ]);
    });

    test('finds and returns the correct node from the vector map', () => {
      expect(vectorMap.findNode(0, 0)).toBe(vectorMap.nodes[0]);
      expect(vectorMap.findNode(1, 0)).toBe(vectorMap.nodes[1]);

      expect(largeVectorMap.findNode(0, 0)).toBe(largeVectorMap.nodes[0]);
      expect(largeVectorMap.findNode(1, 0)).toBe(largeVectorMap.nodes[1]);
      expect(largeVectorMap.findNode(0, 1)).toBe(largeVectorMap.nodes[2]);
      expect(largeVectorMap.findNode(1, 1)).toBe(largeVectorMap.nodes[3]);
      expect(largeVectorMap.findNode(0, 2)).toBe(largeVectorMap.nodes[4]);
      expect(largeVectorMap.findNode(1, 2)).toBe(largeVectorMap.nodes[5]);
    });
  });

  describe('static', () => {
    describe('convertStringToVectorMap', () => {
      let mockConvertTwoDimensionalArrayToVectorMap, returnedVectorMap, str;

      beforeEach(() => {
        returnedVectorMap = 'returnedVectorMap';
        str = '...####\n'
          + '......#\n'
          + '#..#..#\n'
          + '#..#...\n'
          + '####...';

        mockConvertTwoDimensionalArrayToVectorMap = jest
          .spyOn(VectorMap, 'convertTwoDimensionalArrayToVectorMap')
          .mockReturnValue(returnedVectorMap);
      });

      afterEach(() => {
        mockConvertTwoDimensionalArrayToVectorMap.mockRestore();
      });

      test('converts the string to a two dimensional array and calls '
        + 'VectorMap#convertTwoDimensionalArrayToVectorMap with it', () => {
        const expectedArray = [
          ['.', '.', '.', '#', '#', '#', '#'],
          ['.', '.', '.', '.', '.', '.', '#'],
          ['#', '.', '.', '#', '.', '.', '#'],
          ['#', '.', '.', '#', '.', '.', '.'],
          ['#', '#', '#', '#', '.', '.', '.']
        ];

        VectorMap.convertStringToVectorMap(str);
        expect(mockConvertTwoDimensionalArrayToVectorMap).toHaveBeenCalledWith(expectedArray);
      });

      test('returns the result of convertTwoDimensionalArrayToVectorMap', () => {
        expect(VectorMap.convertStringToVectorMap(str)).toBe(returnedVectorMap);
      });
    });

    describe('convertTwoDimensionalArrayToVectorMap', () => {
      test('throws an error when the arrays are not all the same length', () => {
        const invalidArray = [
          ['.', '.', '.', '#', '#', '#', '#'],
          ['.', '.', '.', '.', '.', '.'],
          ['#', '.', '.', '#', '.', '.', '#']
        ];

        expect(() => VectorMap.convertTwoDimensionalArrayToVectorMap(invalidArray))
          .toThrowError('Pathfinder: cannot convert arrays with nonstandard length');
      });

      test('returns a new vector map with a node for every array index', () => {
        const validArray = [
          ['.', '.', '.', '#', '#', '#', '#'],
          ['.', '.', '.', '.', '.', '.', '#'],
          ['#', '.', '.', '#', '.', '.', '#'],
          ['#', '.', '.', '#', '.', '.', '.'],
          ['#', '#', '#', '#', '.', '.', '.']
        ];

        const newVectorMap = VectorMap.convertTwoDimensionalArrayToVectorMap(validArray);

        expect(newVectorMap).toBeInstanceOf(VectorMap);
        expect(newVectorMap.width).toBe(validArray[0].length);
        expect(newVectorMap.height).toBe(validArray.length);
        expect(newVectorMap.nodes).toHaveLength(newVectorMap.width * newVectorMap.height);
        _.each(newVectorMap.nodes, (node) => expect(node).toBeInstanceOf(Node));
      });

      test('attaches the correct vectors to every node based on their key', () => {
        const validArray = [
          ['#', '.', '#'],
          ['#', '.', '.'],
          ['.', '#', '#']
        ];

        const newVectorMap = VectorMap.convertTwoDimensionalArrayToVectorMap(validArray);

        expect(newVectorMap.nodes[0].vectors).toHaveLength(0);

        expect(newVectorMap.nodes[1].vectors).toHaveLength(1);
        expect(newVectorMap.nodes[1].vectors[0].destination).toBe(newVectorMap.nodes[4]);
        expect(newVectorMap.nodes[1].vectors[0].magnitude).toBe(KEYS.PATH.MAGNITUDE);

        expect(newVectorMap.nodes[2].vectors).toHaveLength(0);
        expect(newVectorMap.nodes[3].vectors).toHaveLength(0);

        expect(newVectorMap.nodes[4].vectors).toHaveLength(2);
        expect(newVectorMap.nodes[4].vectors[0].destination).toBe(newVectorMap.nodes[1]);
        expect(newVectorMap.nodes[4].vectors[0].magnitude).toBe(KEYS.PATH.MAGNITUDE);
        expect(newVectorMap.nodes[4].vectors[1].destination).toBe(newVectorMap.nodes[5]);
        expect(newVectorMap.nodes[4].vectors[1].magnitude).toBe(KEYS.PATH.MAGNITUDE);

        expect(newVectorMap.nodes[5].vectors).toHaveLength(1);
        expect(newVectorMap.nodes[5].vectors[0].destination).toBe(newVectorMap.nodes[4]);
        expect(newVectorMap.nodes[5].vectors[0].magnitude).toBe(KEYS.PATH.MAGNITUDE);

        expect(newVectorMap.nodes[6].vectors).toHaveLength(0);
        expect(newVectorMap.nodes[7].vectors).toHaveLength(0);
        expect(newVectorMap.nodes[8].vectors).toHaveLength(0);
      });
    });
  });
});
